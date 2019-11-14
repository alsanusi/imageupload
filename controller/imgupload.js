// Database Connection
const dbConnection = require('./db-connection')

// Request
const request = require('request');

// Multer
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

// Resize Image File Size
const resizeOptimizeImages = require('resize-optimize-images');

// Image File Upload Rules
const uploadProfileImage = upload.fields([{
    name: 'profile',
    maxCount: 10
}])

// Default Message
message = ''

exports.showIndex = (req, res) => {
    res.render('index', message)
}

exports.uploadImage = async (req, res) => {
    uploadProfileImage(req, res, function (err) {
        if (err) {
            message = "Error! To Upload Image."
            res.render('index', {
                message: message,
                status: 'danger'
            });
        } else {
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
            request(verifyUrl, async (err, response, body) => {
                body = JSON.parse(body);

                // If Not Successful
                if (body.success !== undefined && !body.success) {
                    message = "Error! Failed captcha verification."
                    res.render('index', {
                        message: message,
                        status: 'danger'
                    });
                } else {
                    if (!req.files) {
                        message = "Error! in image upload."
                        res.render('index', {
                            message: message,
                            status: 'danger'
                        });
                    } else {
                        const propImageArray = req.files.profile;
                        const propImagePath = propImageArray.map(x => x.path)
                        const propImageName = propImageArray.map(x => x.filename)
                        const propImageMimeType = propImageArray.map(x => x.mimetype)
                        const propImageSize = propImageArray.map(x => x.size)
                        const propImageNameJson = JSON.stringify(propImageName)
                        const propImageMimeTypeJson = JSON.stringify(propImageMimeType)
                        const propImageSizeJson = JSON.stringify(propImageSize)

                        const options = {
                            images: propImagePath,
                            width: 1000,
                            quality: 60
                        };

                        var imageData = {
                            name: propImageNameJson,
                            type: propImageMimeTypeJson,
                            size: propImageSizeJson
                        }

                        dbConnection.con.query('INSERT INTO imgFile SET ?', imageData, function (err, result) {
                            if (err) {
                                res.redirect('/')
                            } else {
                                message = "Successfully! uploaded";
                                res.render('index', {
                                    message: message,
                                    status: 'success'
                                });
                            }
                        })

                        await resizeOptimizeImages(options)
                    }
                }
            });
        }
    })
}