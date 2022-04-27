const express = require('express');
const sendCodeToPhone = require('./src/sendCodeToPhone');
const cors = require('cors')
require('dotenv').config();

// Importing the supabase client.
import { supabase } from './src/helpers/supabase/supabase';
import generateOTP from './src/generateOTP';

// Instantiating express.
const app = express()

// Middleware for (avoiding cross origin ,parsing json data,  reading from encoded urls)
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sending endpoint.
app.use('/get-otp', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    try{
        const { phone_number } = req.body
        // Generating the OTP
        console.log('api started')
        const otp = generateOTP()
        const { error } = await supabase.from('otps').select('phone_number').eq('phone_number',phone_number)
        if( error ) {
            res.json(error)
    
        } else {
            // Updating the verification code against the number.
            const { error, data } = await supabase.from('otps').update({otp: otp, status: "valid"}).eq('phone_number', phone_number)
        
            if(error) {
                res.json(error)
            } else {
                console.log('else started')
                sendCodeToPhone(phone_number, otp)
                .then((data) => {
                    res.status(200).json(data)
                })
                .catch(error => {
                    res.status(400).json(error)
                })
            }
        }
    } catch (error) {
        res.status(500).json({msg: "bad request"})
    }
})

// verifying the otp
app.use('/verify-otp', async (req, res) => {
    try {
        const { phone_number, otp: submittedOtp } = req.body
        if(phone_number && submittedOtp) {
            const { data, error } = await supabase.from('otps').select().eq('phone_number', phone_number)
            if(error) {
                res.json(error)
            } else {
                if(data.length > 0) {
                    const [{ otp, status }] = data
                    console.log(data)
                    if ( status === 'valid' ) {
                        if ( otp === submittedOtp ) {
                            const { error, data } = await supabase.from('otps').update({ status: 'used' }).eq('phone_number', phone_number)
                            if(error) {
                                res.json(error)
                            } else {
                                console.log(data)
                                res.json({ msg: true })
                            }
                        } else {
                            res.json({error: 'invalid otp'})
                        }
                    } else {
                        res.json({error: 'expired otp'})
                    }
                } else {
                    res.json({msg: "no otp please regenerate otp."})
                }
            }
        } else {
            res.json({msg: 'missing phone number or otp'})
        }
    } catch (error) {
        res.status(500).json({msg: "bad request"})
    }   
})

const PORT = 5000 || process.env.PORT
const server = app.listen(PORT, () => console.log(`Express is running on ${PORT}`))
module.exports = app
