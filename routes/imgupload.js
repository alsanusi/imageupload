const express = require('express')
const app = express()
const request = require('request');

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
app.get('/', async (req, res) => {
    res.render('index', message)
})

app.post('/upload', upload.single('profile'), async (req, res) => {
    const captchaKey = req.body['g-recaptcha-response'];
    if (
        req.body['g-recaptcha-response'] === undefined ||
        req.body['g-recaptcha-response'] === '' ||
        req.body['g-recaptcha-response'] === null
    ) {
        message = "Error! Please Select Captcha."
        res.render('index', {
            message: message,
            status: 'danger'
        });
    }

    // reCAPTCHA SECRET KEY
    // 6LdaSb0UAAAAAEDR9g2oKo7HU5AHz4MqDbPeZU0o

    // Secret Key
    const secretKey = '6LdaSb0UAAAAAEDR9g2oKo7HU5AHz4MqDbPeZU0o';

    // Verify URL
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaKey}&remoteip=${req.connection.remoteAddress}`;

    // Make Request To VerifyURL
    request(verifyUrl, (err, response, body) => {
        body = JSON.parse(body);

        // If Not Successful
        if (body.success !== undefined && !body.success) {
            message = "Error! Failed captcha verification."
            res.render('index', {
                message: message,
                status: 'danger'
            });
        } else {
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
        }
    });
})

module.exports = app;