const UserModal = require('../../modals/users.modal')
const OtpModal = require('../../modals/otp.modal')
const { send_sms_for_login } = require('../../helpers/twillio')
module.exports = {
    /**
     * 
     * @param {*} payload 
     * @returns {success:true/false, data:users}
     */
    async saveUsers(payload) {
        return await new Promise(async (resolve, reject) => {
            await send_sms_for_login(payload.phone)
                .then(async (data) => {
                    let isExist = await UserModal.findOne({ phone: payload.phone })
                    if (!isExist) {
                        let saveUser = await UserModal.create(payload)
                        if (saveUser) {
                            let saveOtp = await OtpModal.create({
                                userId: saveUser._id,
                                phone: payload.phone,
                                otp: data.otp
                            })
                            if (saveOtp) {
                                resolve({ success: true, data: saveUser })
                            } else {
                                reject({ success: false })
                            }
                        } else {
                            reject({ success: false })
                        }
                    } else {
                        let saveOtp = await OtpModal.create({
                            userId: isExist._id,
                            phone: payload.phone,
                            otp: data.otp
                        })
                        if (saveOtp) {
                            resolve({ success: true, data: isExist })
                        } else {
                            reject({ success: false })
                        }
                    }
                }).catch((err) => {
                    reject({ success: false })
                });
        })
    },

    /**
    * 
    * @param {*} payload 
    * @returns {success:true/false, data:users}
    */
    async verifyAccount(payload) {
        let isExitOtp = await OtpModal.findOne({
            phone: payload.phone,
            otp: payload.otp,
            verifyStatus: 0
        })

        if (isExitOtp) {
            let isUpdateOtp = await OtpModal.findOneAndUpdate({ phone: payload.phone, verifyStatus: 0 }, { verifyStatus: 1 }, { new: true })

            let isUpdateUser = await UserModal.findOneAndUpdate({ phone: payload.phone, verifyStatus: 0 }, { verifyStatus: 1 }, { new: true })
            if (isUpdateOtp && isUpdateUser) {
                return { success: true, data: isExitOtp }
            } else {
                return { success: false }
            }
        } else {
            return { success: false }
        }
    },


    /**
    * 
    * @param {*} payload 
    * @returns {success:true/false, data:users}
    */
    async verifyForgotPassword(payload) {
        let isExitOtp = await OtpModal.findOne({
            phone: payload.phone,
            otp: payload.otp,
            verifyStatus: 0
        })

        if (isExitOtp) {
            let isUpdateOtp = await OtpModal.findOneAndUpdate({ phone: payload.phone, verifyStatus: 0 }, { verifyStatus: 1 }, { new: true })

            let isUpdateUser = await UserModal.findOneAndUpdate({ phone: payload.phone }, { verifyStatus: 1 }, { new: true })
            if (isUpdateOtp && isUpdateUser) {
                return { success: true, data: isExitOtp }
            } else {
                return { success: false }
            }
        } else {
            return { success: false }
        }
    },


    /**
    * 
    * @param {*} payload 
    * @returns {success:true/false, data:users}
    */
    async changeForgotPassword(payload) {
        let isExitOtp = await OtpModal.findOne({ phone: payload.phone, otp: payload.otp, verifyStatus: 1 })
        if (isExitOtp) {
            let isUpdateUser = await UserModal.findOneAndUpdate({ phone: payload.phone }, { password: payload.password }, { new: true })
            if (isUpdateUser) {
                return { success: true, data: isExitOtp }
            } else {
                return { success: false }
            }
        } else {
            return { success: false }
        }
    },



    /**
   * 
   * @param {*} payload 
   * @returns {success:true/false, data:users}
   */
    async forgotPassword(payload) {
        return await new Promise(async (resolve, reject) => {
            let isExist = await UserModal.findOne({ phone: payload.phone })
            if (isExist) {
                await send_sms_for_login(payload.phone)
                    .then(async (data) => {
                        let saveOtp = await OtpModal.create({
                            userId: isExist._id,
                            phone: payload.phone,
                            otp: data.otp
                        })
                        if (saveOtp) {
                            resolve({ success: true, data: isExist })
                        } else {
                            reject({ success: false })
                        }
                    }).catch((err) => {
                        reject({ success: false })
                    });
            } else {
                reject({ success: false })
            }

        })
    },


    /**
     * 
     * @param {*} payload 
     * @returns {success:true/false, data:users}
     */
    async getUsers() {
        let users = await UserModal.find({}, { __v: 0, password: 0 })
        if (users) {
            return { success: true, data: users }
        } else {
            return { success: false }
        }
    }
}
