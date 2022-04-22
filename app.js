const express = require('express');
const sendMessage = require('./src/sendMessage');
require('dotenv').config();

import { supabase } from './src/helpers/supabase';
import generateOTP from './src/generateOTP';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/send', async (req, res) => {
    const { phone_number } = req.body
    const { data, error } = await supabase.from('signup').select('phone_number').eq(phone_number)
    if( error ) {
       res.json(error)

    } else {
        const { data, error } = await supabase.from('signup').insert({verification_code: await generateOTP()}).eq('phone_number', phone_number)
        res.json(data)
    }

    sendMessage(phone_number, verification_code)
    .then((data) => {
        // console.log(data)
        res.json({...data})
    })
    .catch(error => {
        // console.log(error)
        res.status(400).json({...error})
    })

})

app.post('verify', async (req, res) => {
    
})

const PORT = 5000 || process.env.PORT
const server = app.listen(PORT, () => console.log(`Express is running on ${PORT}`))

