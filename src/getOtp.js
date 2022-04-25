const  africastalking = require('africastalking')
require('dotenv').config()

const { USERNAME, APIKEY, SENDERID } = process.env

/**
 * @typedef Africastalking  
 */

/**
 * Consume africas talking api
 * @param {string} phone_number 
 * @param {number} otp 
 * @returns { Promise<Africastalking> } A promise to Africas's talking SMS client. 
 */

const sendCodeToPhone = (phone_number, otp) => {
    const client = africastalking({
        username: USERNAME,
        apiKey: APIKEY
    });
    
    return client.SMS.send({
        to:phone_number,
        message: `Bweyogerere Tubeerebumu Sacco. \n Your verification code is ${otp}.`,
        from: SENDERID,
    })
}

module.exports=sendCodeToPhone
