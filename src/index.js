import africastalking from 'africastalking'

const client = africastalking({
    username: 'sandbox',
    apiKey: 'be4b73c861d09ca11bd5fd25dc947d01d7dc81e966dc242b20f0947ba06a7a46'
});

client.SMS.send({
    to:'+256757501751',
    message: 'Bweyogerere Tubeerebumu Sacco. \n Your verification code is 898787.',
    from: 'DAVID-M',
})
.then(() => console.log('Message is sent successfully.'))
.catch((error) => console.log(error))