const express = require('express');
const sendMessage = require('./src/index');
require('dotenv').config();

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', async (req, res) => {
  const { phone_number, verification_code } = req.body
  const response = await sendMessage(phone_number, verification_code)
  console.log(response)
})

const PORT = 5000
const server = app.listen(PORT, () => console.log(`Express is running on ${PORT}`))

