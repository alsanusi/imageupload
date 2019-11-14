const express = require('express')
const app = express()

// Controller
const imgUploadController = require('../controller/imgupload')

// End-Point
app.get('/', imgUploadController.showIndex)
app.post('/upload', imgUploadController.uploadImage)

module.exports = app;