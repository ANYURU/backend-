import africastalking from 'africastalking'
require('dotenv').config()

const { USERNAME, APIKEY, SENDERID } = process.env

const sendMessage = (phone_number, verification_code) => {
    const client = africastalking({
        username: USERNAME,
        apiKey: APIKEY
    });
    
    return client.SMS.send({
        to:phone_number,
        message: `Bweyogerere Tubeerebumu Sacco. \n Your verification code is ${verification_code}.`,
        from: SENDERID,
    })
}

module.exports=sendMessage
