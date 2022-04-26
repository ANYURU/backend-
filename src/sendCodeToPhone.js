const  africastalking = require('africastalking')
require('dotenv').config()

const { USERNAME, APIKEY, SENDERID } = process.env

/**
 * @typedef {Object} Africastalking
 * @property {number} status 200 If the message is successfuly sent to the user and the entry is successfully added to the otps table in supabase. And 400 if the message is not not successfully sent to the user.
 * @property {string} error If the message is not successfully sent tot the user.
 * @property {string} msg If the message is successgully sent to the user.
 */

/**
 * @function
 * @name sendCodeToPhone
 * @param {string} phone_number the number of the person intending to signup.
 * @param {number} otp the one time password submitted the person intending to signup.
 * @returns { Promise<Africastalking> } A promise that returns a json object.
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
