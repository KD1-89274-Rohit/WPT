const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'manager',
    database: 'airbnb_db',
    connectionLimit: 10
})

module.exports = pool