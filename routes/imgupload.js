const express = require('express')
const app = express()

const multer = require('multer')
const dir = './uploads'

const path = require('path')

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({
    storage: storage
});

message = ''
app.get('/', (req, res) => {
    res.render('index', message)
})

app.post('/upload', upload.single('profile'), function (req, res) {
    message: "Error! in image upload."
    if (!req.file) {
        console.log("No file received");
        message = "Error! in image upload."
        res.render('index', {
            message: message,
            status: 'danger'
        });

    } else {
        console.log('file received');
        console.log(req);

        req.getConnection(function (err, con) {
            var imageData = {
                name: req.file.filename,
                type: req.file.mimetype,
                size: req.file.size
            }
            console.log(con)
            // var sql = "INSERT INTO file SET ?('name', 'type', 'size') VALUES ('" + req.file.filename + "', '" + req.file.mimetype + "', '" + req.file.size + "')";
            con.query('INSERT INTO file SET ?', imageData, function (err, result) {
                console.log('inserted data');
                console.log(result)
            });
            message = "Successfully! uploaded";
            res.render('index', {
                message: message,
                status: 'success'
            });

        })
    }
});

module.exports = app;