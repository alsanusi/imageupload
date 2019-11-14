const express = require('express')
const app = express()

// Template View Engine - EJS
app.set('view engine', 'ejs')
app.use(express.static("views"))

// body-parser is used to read HTTP POST data from Form Input.
var bodyParser = require('body-parser')
// bodyParser.urlencoded() parses the text as URL encoded data.
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// Routes
const imgUpload = require('./routes/imgupload')
app.use('/', imgUpload)

app.listen(3000, () => {
    console.log('Server running at port 3000: http://127.0.0.1:3000')
})