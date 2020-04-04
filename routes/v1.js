const express = require('express')
const router = express.Router()
const passport = require('passport')

// controllers
const { getLogin, getRegister, getResource } = require('./../controllers/v1_get')
const { processUser, register } = require('./../controllers/v1_post')

// @GET /login 
// show login form 
router.get('/login', getLogin)

// @GET /register
// show register form
router.get('/register', getRegister)

// @GET /protected
// fetch protected resource, PS: user must be authenticated before accessing this endpoint
router.get('/protected',passport.authenticate('jwt',{session:false}), getResource)

// @POST /login
// authenticate user against our dummy data, response with JWT token on successful authentication
router.post('/login',passport.authenticate('local', {  session: false, failureRedirect: '/login' }), processUser)

// @POST /register
// register a new user
router.post('/register', register)

module.exports = router


