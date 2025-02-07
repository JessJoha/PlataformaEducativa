const db = require('../config/db');
const bcrypt = require('bcrypt'); 

const createUser = (username, hashedPassword, role) => {
  return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
      db.query(sql, [username, hashedPassword, role], (err, result) => {
          if (err) return reject(err);
          resolve(result);
      });
  });
};


User.prototype.checkPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};
  module.exports = { createUser };