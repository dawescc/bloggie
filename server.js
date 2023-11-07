const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/api', (req, res, next) => {
  const referer = req.get('Referer');
  const allowedReferers = [
    `http://localhost:${PORT}`, `https://blog.dawes.cc`,
  ];

  if (allowedReferers.some(allowedReferer => referer && referer.startsWith(allowedReferer))) {
    next();
  } else {
    res.status(403).send('Access Denied');
  }
});

app.get('/api/articles', (req, res) => {
  const dbPath = path.join(__dirname, 'base.db');
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error connecting to the database');
      return;
    }
  });

  const sql = 'SELECT * FROM articles';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error fetching articles');
    } else {
      res.json(rows);
    }
    db.close();
  });
});

app.post('/api/articles', (req, res) => {
  const dbPath = path.join(__dirname, 'base.db');
  const { content, tags } = req.body;
  const db = new sqlite3.Database(dbPath);
  
  const sql = 'INSERT INTO articles (content, tags) VALUES (?, ?)';
  db.run(sql, [content, tags], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error saving the article');
    } else {
      res.status(201).json({ id: this.lastID });
    }
    db.close();
  });
});

app.put('/api/articles/:id', (req, res) => {
  const dbPath = path.join(__dirname, 'base.db');
  const { content, tags } = req.body;
  const { id } = req.params;
  const db = new sqlite3.Database(dbPath);
  
  const sql = 'UPDATE articles SET content = ?, tags = ? WHERE id = ?';
  db.run(sql, [content, tags, id], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error updating the article');
    } else {
      res.status(200).json({ id: id, changes: this.changes });
    }
    db.close();
  });
});

app.delete('/api/articles/:id', (req, res) => {
  const dbPath = path.join(__dirname, 'base.db');
  const { id } = req.params;
  const db = new sqlite3.Database(dbPath);
  
  const sql = 'DELETE FROM articles WHERE id = ?';
  db.run(sql, id, function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error deleting the article');
    } else {
      res.status(200).json({ id: id, changes: this.changes });
    }
    db.close();
  });
});

app.get('/admin', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
