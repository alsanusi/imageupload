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
    storage: storage,
    limits: {
        fileSize: 3 * 1204 * 1204,
        files: 1
    }
});

message = ''
app.get('/', (req, res) => {
    res.render('index', message)
})

const imageUpload = upload.single('profile')
app.post('/upload', function (req, res) {
    imageUpload(req, res, function (err) {
        if (err) {
            message = "File Size Too Big"
            res.render('index', {
                message: message,
                status: 'danger'
            });
        } else {
            message: "Error! in image upload."
            if (!req.file) {
                console.log("No file received");
                message = "Error! in image upload."
                res.render('index', {
                    message: message,
                    status: 'danger'
                });
            } else {
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
            }
        }
    })
});

module.exports = app;