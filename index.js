const express = require('express');
const cors = require('cors')
require('dotenv').config();
const {allowCors, getOtpHandler, verifyOtpHandler} = require('./src/handlers/handlers')

// Instantiating express.
const app = express()

// Middleware for (avoiding cross origin ,parsing json data,  reading from encoded urls)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sending endpoint.
app.use('/get-otp', allowCors(getOtpHandler))

// verifying the otp
app.use('/verify-otp', allowCors(verifyOtpHandler))

const PORT = 5000 || process.env.PORT
const server = app.listen(PORT, () => console.log(`Express is running on ${PORT}`))
module.exports = app
