const router = require('express').Router()
const {_checkAuthenticatedAdmin,  _loginWithCookie, _autoRenewAccessToken} = require('../../helper/auth.helper')
const authRouter = require('./auth.route')
const indexRouter = require('./index.route')
const profileRouter = require('./profile.route')
const accountRouter = require('./account.route')
const categoryRouter = require('./category.route')
const productRouter = require('./product.route')
const providerRouter = require('./provider.route')
const orderRouter = require('./order.route')
const voucherRouter = require('./voucher.route')
const contactRouter = require('./contact.route')
const restockRouter = require('./restock.route')
const storageRouter = require('./storage.route')

router.use(_autoRenewAccessToken)
router.use(_loginWithCookie)
router.use(authRouter)
router.use(_checkAuthenticatedAdmin)
router.use(indexRouter)
router.use(profileRouter)
router.use('/accounts', accountRouter)
router.use('/categories', categoryRouter)
router.use('/products', productRouter)
router.use('/vouchers', voucherRouter)
router.use('/contacts', contactRouter)

module.exports = router