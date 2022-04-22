const express = require('express');
const sendMessage = require('./src/sendMessage');
const cors = require('cors')
require('dotenv').config();

// Importing the supabase client.
import { supabase } from './src/helpers/supabase';
import generateOTP from './src/generateOTP';

// Instantiating express.
const app = express()

// Middleware for (avoiding cross origin ,parsing json data,  reading from encoded urls)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sending endpoint.
app.use('/send', async (req, res) => {
    const { phone_number } = req.body

    // Generating the OTP
    const verification_code = await generateOTP()
    const { error } = await supabase.from('signup').select('phone_number').eq('phone_number',phone_number)
    if( error ) {
       res.json(error)

    } else {
        // Updating the verification code against the number.
        const { error } = await supabase.from('signup').update({verification_code: verification_code}).eq('phone_number', phone_number)
        if(error) {
            res.json(error)
        } else {
            sendMessage(phone_number, verification_code)
            .then((data) => {
                res.json({...data})
            })
            .catch(error => {
                res.status(400).json({...error})
            })
        }
    }

})

// verifying the otp
app.use('/verify', async (req, res) => {
    const { phone_number, verification_code:otp } = req.body
    const { data, error } = await supabase.from('signup').select('verification_code').eq('phone_number', phone_number)
    if(error) {
        res.json(error)
    } else {
        console.log(data) 
        console.log(`otp: ${otp}`)
        const [{ verification_code }] = data
        console.log(`verification code: ${verification_code}`)
        if(otp === verification_code) {
            res.json({msg: true })
        } else {
            res.status(400).json({msg: 'invalid otp'})
        }
    }
})

const PORT = 5000 || process.env.PORT
const server = app.listen(PORT, () => console.log(`Express is running on ${PORT}`))

