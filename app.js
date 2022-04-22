const express = require('express');
const sendMessage = require('./src/sendMessage');
require('dotenv').config();

// Importing the supabase client.
import { supabase } from './src/helpers/supabase';
import generateOTP from './src/generateOTP';

// Instantiating express.
const app = express()

// Middleware for (parsing json data,  reading from encoded urls)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sending endpoint.
app.get('/send', async (req, res) => {
    const { phone_number } = req.body

    // Generating the OTP
    const verification_code = await generateOTP()
    const { error } = await supabase.from('signup').select('phone_number').eq(phone_number)
    if( error ) {
       res.json(error)

    } else {
        // Inserting the verification code against the number.
        const { error } = await supabase.from('signup').insert({verification_code: OTP}).eq('phone_number', phone_number)
        if(error) {
            res.json(error)
        } else {
            // res.json(data)
            // Sending the OTP
            sendMessage(phone_number, verification_code)
            .then((data) => {
                // console.log(data)
                res.json({...data})
            })
            .catch(error => {
                // console.log(error)
                res.status(400).json({...error})
            })
        }
    }

})

// app.post('/verify', async (req, res) => {
//     const { phone_number, verification_code } = req.body
//     const { data, error } = await supabase.from('signup').select('phone_number', 'verification_code').eq()




// })

const PORT = 5000 || process.env.PORT
const server = app.listen(PORT, () => console.log(`Express is running on ${PORT}`))

