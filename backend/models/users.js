const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async create(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
        [username, email, hashedPassword],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, username });
          }
        }
      );
    });
  }

  static async findByUsernameOrEmail(username, email) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM users WHERE username = ? OR email = ?`,
        [username, email],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  }
}

module.exports = User;
