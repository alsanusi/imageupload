const express = require('express')
const app = express()

const mysql = require('mysql')
const myConnection = require('express-myconnection')

const dbConfig = require('./dbConfig')
const dbOptions = {
    host: dbConfig.database.host,
    user: dbConfig.database.user,
    password: dbConfig.database.password,
    port: dbConfig.database.port,
    database: dbConfig.database.database
}

app.use(myConnection(mysql, dbOptions, 'pool'))

app.set('view engine', 'ejs')
app.use(express.static("views"))

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

const imgUpload = require('./routes/imgupload')
app.use('/', imgUpload)


app.listen(3000, () => {
    console.log('Server running at port 3000: http://127.0.0.1:3000')
})