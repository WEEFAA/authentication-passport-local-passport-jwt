const JWT = require('jsonwebtoken')
// dummy data
const { Users } = require('./../data') 
// configs
const { JWT_ISSUER, JWT_SECRET } = require('./../config')

// @POST /login
// authenticate user against our dummy data, response with JWT token on successful authentication
exports.processUser = function(req,res){
	const { email } = req.user // authenticated user via local strategy
	const payload = { iss:JWT_ISSUER, sub:email }
	//sign the token with the payload
	JWT.sign(payload,JWT_SECRET,function(err,token){
		//send that token in the response as json
		res.json({token})
	})
}

// @POST /register
// register a new user
exports.register = function registry(req,res,next){
	const { email, password} = req.body 

	const user = Users.find(user => user.email === email)
	// if this email is already taken, reject register
	if(user) return res.redirect('/register')

	//create a new user 
	const user = { email, password }
	Users.push(user)
	
	//redirect to homepage
	return res.redirect('/')
}
