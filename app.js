const express = require('express');
const sendMessage = require('./src/index');
require('dotenv').config();

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', (req, res) => {
  const { phone_number, verification_code } = req.body
  sendMessage(phone_number, verification_code).then((data) => console.log(data)).catch(error => console.log(error))

})

const PORT = 5000
const server = app.listen(PORT, () => console.log(`Express is running on ${PORT}`))

