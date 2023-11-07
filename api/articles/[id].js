const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', '..', 'base.db');

const updateArticle = (req, res) => {
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).end('Error connecting to the database');
      return;
    }
  });

  const { id } = req.query;
  const { content, tags } = req.body;
  const sql = 'UPDATE articles SET content = ?, tags = ? WHERE id = ?';

  db.run(sql, [content, tags, id], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).end('Error updating the article');
    } else {
      res.status(200).json({ id: id, changes: this.changes });
    }
    db.close();
  });
};

const deleteArticle = (req, res) => {
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).end('Error connecting to the database');
      return;
    }
  });

  const { id } = req.query;
  const sql = 'DELETE FROM articles WHERE id = ?';

  db.run(sql, id, function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).end('Error deleting the article');
    } else {
      res.status(200).json({ id: id, changes: this.changes });
    }
    db.close();
  });
};

module.exports = (req, res) => {
  switch (req.method) {
    case 'PUT':
      updateArticle(req, res);
      break;
    case 'DELETE':
      deleteArticle(req, res);
      break;
    default:
      res.status(405).end('Method Not Allowed');
  }
};
