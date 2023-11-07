const sqlite3 = require('sqlite3');
const path = require('path');

const checkReferer = (req) => {
  const referer = req.headers.referer;
  const PORT = process.env.PORT || 3000;
  const allowedReferers = [
    `http://localhost:${PORT}`, // Localhost for development
    `https://blog.dawes.cc`,    // Production domain
  ];
  return allowedReferers.some(allowedReferer => referer && referer.startsWith(allowedReferer));
};

const getArticles = (req, res) => {
  const dbPath = path.join(__dirname, '..', 'base.db');
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).end('Error connecting to the database');
      return;
    }
  });

  const sql = 'SELECT * FROM articles';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).end('Error fetching articles');
    } else {
      res.json(rows);
    }
    db.close();
  });
};

const postArticle = (req, res) => {
  const dbPath = path.join(__dirname, '..', 'base.db');
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).end('Error connecting to the database');
      return;
    }
  });

  const { content, tags } = req.body;
  const sql = 'INSERT INTO articles (content, tags) VALUES (?, ?)';
  db.run(sql, [content, tags], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).end('Error saving the article');
    } else {
      res.status(201).json({ id: this.lastID });
    }
    db.close();
  });
};

module.exports = (req, res) => {
  if (!checkReferer(req)) {
    res.status(403).end('Access Denied');
    return;
  }

  switch (req.method) {
    case 'GET':
      getArticles(req, res);
      break;
    case 'POST':
      postArticle(req, res);
      break;
    default:
      // If the method is not GET or POST, return 405 Method Not Allowed.
      res.status(405).end('Method Not Allowed');
  }
};
