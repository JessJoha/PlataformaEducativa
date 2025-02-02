const db = require('../config/db');

const deleteUserById = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = { deleteUserById };
