const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const { otp_generate } = require('./generators')

module.exports = {
    send_sms_for_login: async (phone) => {
        return await new Promise(async (resolve, reject) => {
            let genOtp = await otp_generate()
            client.messages
                .create({
                    body: genOtp.message,
                    from: '+15405024285',
                    to: `+91${phone}`
                })
                .then(message => {
                    resolve({ data: message, otp: genOtp.otp })
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}