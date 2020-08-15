const router = require('express').Router()
const {_ensureAccessToken, _ensureAdminRole} = require('../helper/auth')
const authRouter = require('./auth.route')
const userRouter = require('./admin/user.route')
const categoryRouter = require('./admin/category.route')
const profileRouter = require('./admin/profile.route')
const addressRouter = require('./admin/address.route')
const productRouter = require('./admin/product.route')

// All below routes have prefix '/api/'
// Client routes
router.use(authRouter)
// Admin routes
router.use('/admin/*', _ensureAccessToken, _ensureAdminRole)
router.use('/admin/users', userRouter)
router.use('/admin/categories', categoryRouter)
router.use('/admin/profile', profileRouter)
router.use('/admin/addresses', addressRouter)
router.use('/admin/products', productRouter)

module.exports = router