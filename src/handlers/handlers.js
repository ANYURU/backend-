const sendCodeToPhone = require('../sendCodeToPhone');
const generateOTP = require('../generateOTP')

// Importing the supabase client.
import { supabase } from '../helpers/supabase/supabase';

function allowCors(func) {
    return async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        )
        if (req.method === 'OPTIONS') {
            res.status(200)
            return
        }
        return await func(req, res)
    }
}
  
  
const getOtpHandler = async (req, res) => {
    try{
        const { phone_number } = req.body
        // Generating the OTP
        console.log('api started')
        const otp = generateOTP()
        console.log(otp)
        const { error } = await supabase.from('otps').select('phone_number').eq('phone_number',phone_number)
        if( error ) {
            console.log('reached')
            console.log(res)
            res.json(error)
        } else {
            // Updating the verification code against the number.
            console.log('else started')
            const { error, data } = await supabase.from('otps').update({otp: otp, status: "valid"}).eq('phone_number', phone_number)
        
            if(error) {
                console.log('supa error')
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
}

const verifyOtpHandler = async (req, res) => {
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
}

module.exports={
    allowCors,
    getOtpHandler,
    verifyOtpHandler
}

