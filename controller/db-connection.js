//Database Connection
const mysql = require('mysql')
const config = require('../dbconfig')
exports.con = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    port: config.database.port,
    database: config.database.database
})