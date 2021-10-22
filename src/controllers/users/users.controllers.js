const { userModal } = require('../../entity/index')

module.exports = {
    /**
     * @POST Create New Users
     * @param {fname,lname,email,password,phone}
     */
    async registerUsers(req, res, next) {
        try {
            let payload = req.body
            await userModal.saveUsers(payload)
                .then((data) => {
                    res.status(201).json({
                        success: true,
                        message: 'Success',
                        data: {
                            id: data.data._id,
                            phone: data.data.phone
                        }
                    })
                }).catch(err => {
                    res.status(400).json({
                        success: false,
                        message: 'Failed'
                    })
                })
        } catch (error) {
            next(error)
        }
    },

    /**
   * @POST Verify Account
   * @param {}
   */
    async verifyAccount(req, res, next) {
        try {
            let payload = req.body
            let isVerify = await userModal.verifyAccount(payload)
            if (isVerify.success) {
                res.status(201).json({
                    success: true,
                    message: 'Verified Account',
                    data: isVerify.data
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Failed'
                })
            }

        } catch (error) {
            next(error)
        }
    },

    /**
   * @POST Verify Account
   * @param {}
   */
    async verifyForgotPassword(req, res, next) {
        try {
            let payload = req.body
            let isVerify = await userModal.verifyForgotPassword(payload)
            if (isVerify.success) {
                res.status(201).json({
                    success: true,
                    message: 'Oto Verified',
                    data: payload
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Failed'
                })
            }
        } catch (error) {
            next(error)
        }
    },


    /**
  * @POST forgotPassword
  * @param {}
  */
    async forgotPassword(req, res, next) {
        try {
            let payload = req.body
            await userModal.forgotPassword(payload)
                .then((data) => {
                    res.status(201).json({
                        success: true,
                        message: 'success',
                        data: {
                            id: data.data._id,
                            phone: data.data.phone
                        }
                    })
                }).catch(err => {
                    res.status(400).json({
                        success: false,
                        message: 'Failed'
                    })
                })
        } catch (error) {
            next(error)
        }
    },

    /**
* @POST changesPassword
* @param {}
*/
    async changesPassword(req, res, next) {
        try {
            let payload = req.body
            let isVerify = await userModal.changeForgotPassword(payload)
            if (isVerify.success) {
                res.status(201).json({
                    success: true,
                    message: 'Password Change Successfully',
                    data: { userId: isVerify.data.userId }
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Failed'
                })
            }

        } catch (error) {
            next(error)
        }
    },

    /**
    * @POST Create New Users
    * @param {fname,lname,email,password,phone}
    */
    async getUsers(req, res, next) {
        try {
            let users = await userModal.getUsers()
            if (users.success) {
                res.status(201).json({
                    success: true,
                    message: 'Success',
                    data: users.data
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Failed'
                })
            }

        } catch (error) {
            next(error)
        }
    }
}