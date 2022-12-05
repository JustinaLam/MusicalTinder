const mysql = require('mysql');
// const config = require('./config.js')
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: 'admin',
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
connection.connect();

async function recentSongs(req, res) {
  connection.query(`SELECT S.track_id AS id, S.track_name AS name
    FROM Songs S
    ORDER BY S.release_date DESC
    LIMIT 100;`, function (error, results) {
    if (error) {
      throw new Error(`error getting recent songs ${error.message}`);
    } else if (results) {
      res.json({ data: results })
    }
  });
}

module.exports = {
  recentSongs,
}