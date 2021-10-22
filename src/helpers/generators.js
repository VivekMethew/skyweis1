module.exports = {
    otp_generate: async () => {
        let otp = Math.ceil((Math.random() * 1000000) + 1);
        return {
            otp: otp,
            message: `${otp} is your OTP to proceed further with Sparklebox. OTPs are confidential, please do not share it with anyone.  www.skyweis.com`
        };
    }
}