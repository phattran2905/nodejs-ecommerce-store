const LocalStrategy = require("passport-local").Strategy
const RememberStrategy = require("passport-remember-me").Strategy
const RememberMeModel = require("../models/RememberMeModel")
const crypto = require("crypto")
const authHelper = require("../helper/auth.helper")

module.exports = async function (passport) {
    const validate = async function (username, password, done) {
        try {
            const validation = await authHelper.validateUser(username, password, "admin")
            if (validation.error != null ) {
                if (validation.error.name === 'ValidationError') {
                    return done(null, false, {message: validation.error.invalidation[0].message})
                }else {
                    throw new Error(validation.error.message)
                }
            } 

            return done(null, validation.user)
        } catch (error) {
            return done(error)
        }
    }

    const issueRememberTK = async ({ id, accessToken, refreshToken }, done) => {
        const newRememberMeTk = crypto.randomBytes(16).toString("hex")
        try {
            const updatedToken = await RememberMeModel.findOneAndUpdate(
                { userId: id },
                { remember_token: newRememberMeTk },
                { new: true }
            ).lean()

            if (updatedToken) return done(null, newRememberMeTk)

            return done(null, false, { message: "Failed to create new remember token." })
        } catch (error) {
            return done(error)
        }
    }

    const consumeRememberTK = async (token, done) => {
        try {
            const isExistentTK = await RememberMeModel.findOne({ remember_token: token }).lean()

            if (isExistentTK) {
                const updatedToken = await RememberMeModel.findOneAndUpdate(
                    { remember_token: token },
                    { remember_token: null },
                    { new: true }
                )

                if (updated)
                    return done(null, {
                        id: updatedToken.userId,
                        accessToken: updatedToken.access_token,
                        refreshToken: updatedToken.refresh_token,
                    })
            }

            return done(null, false, { message: "Invalid remember token." })
        } catch (error) {
            return done(error)
        }
    }

    passport.use(
        new LocalStrategy(
            {
                usernameField: "username",
                passwordField: "password",
            },
            validate
        )
    )

    passport.use(
        new RememberStrategy(
            consumeRememberTK,
            issueRememberTK
        )
    )

    passport.serializeUser(function (admin, done) {
        return done(null, {
            id: admin.id,
            accessToken: admin.accessToken,
            refreshToken: admin.refreshToken,
        })
    })

    passport.deserializeUser(async function (adminData, done) {
        try {
            const data = await authHelper.getUser({ ...adminData })
            if (data.user) {
                return done(null, data.user)
            }

            return done(data.error)
        } catch (error) {
            return done(error)
        }
    })
}
