const db = require('../config/db');
const bcrypt = require('bcrypt'); 

const createUser = (username, password, role, callback) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => { 
        if (err) return callback(err);

        const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
        db.query(sql, [username, hashedPassword, role], callback);
    });
};

module.exports = { createUser };