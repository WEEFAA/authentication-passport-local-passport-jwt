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
	try{
		const { email, password} = req.body 

		const isRegistered = Users.find(user => user.email === email)
		if(isRegistered){
			//redirect the user to the /register route
			//no error message yet but @assume that the user should
			//see a display message or flash message that the email is already in used
			return res.redirect('/register')
		}

		//construct a new user 
		const user = {
			email,
			password
		}

		//push the new user to the database @simulating it
		Users.push(user)

		//call the next middleware
		next()

	}catch(error){
		throw new Error(error)
	}
}

// @POST /register
// register a new user
exports.registerRedirect = function(req,res){
	//redirect user to login page after successful registration
	res.redirect('/login')
}