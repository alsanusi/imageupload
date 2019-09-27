const express = require('express')
const app = express()

// Multer
const multer = require('multer')
const dir = './uploads'

// Sharp
const sharp = require('sharp');

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

app.post('/upload', upload.single('profile'), async (req, res) => {
    if (!req.file) {
        message = "Error! in image upload."
        res.render('index', {
            message: message,
            status: 'danger'
        });
    } else {
        // Resize
        sharp(req.file.path).toBuffer().then((data) => {
            sharp(data).resize(800).toFile(req.file.path, (err, info) => {
                // Data
                var imageData = {
                    name: req.file.filename,
                    type: req.file.mimetype,
                    size: req.file.size
                }
                req.getConnection(function (err, con) {
                    con.query('INSERT INTO imgFile SET ?', imageData, function (err, result) {
                        message = "Successfully! uploaded";
                        res.render('index', {
                            message: message,
                            status: 'success'
                        });
                    });
                })
            })
        }).catch((err) => {
            console.log(err)
        })
    }
})

module.exports = app;