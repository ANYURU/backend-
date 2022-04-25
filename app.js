const express = require('express');
const sendCodeToPhone = require('./src/getOtp');
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
app.use('/get-otp', async (req, res) => {
    const { phone_number } = req.body
    // Generating the OTP
    // console.log('api started')
    const otp = generateOTP()
    const { error } = await supabase.from('otps').select('phone_number').eq('phone_number',phone_number)
    if( error ) {
        res.json(error)

    } else {
        // Updating the verification code against the number.
        const { error, data } = await supabase.from('otps').update({otp: otp}).eq('phone_number', phone_number)
    
        if(error) {
            res.json(error)
        } else {
            console.log(data)
            sendCodeToPhone(phone_number, otp)
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(error => {
                res.status(400).json(error)
            })
        }
    }
})

// verifying the otp
app.use('/verify-otp', async (req, res) => {
    const { phone_number, otp: submittedOtp } = req.body
    if(phone_number && submittedOtp) {
        const { data, error } = await supabase.from('otps').select('otp').eq('phone_number', phone_number)
        if(error) {
            res.json(error)
        } else {
            if(data.length > 0) {
                const [{ otp }] = data
                if ( otp === submittedOtp ) {
                    res.json({ msg: true })
                } else {
                    res.json({error: 'invalid otp'})
                }
            } else {
                res.json({msg: "no otp please regenerate otp."})
            }
        }
    } else {
        res.json({msg: 'missing phone number or otp'})
    }
    
})

const PORT = 5000 || process.env.PORT
const server = app.listen(PORT, () => console.log(`Express is running on ${PORT}`))

