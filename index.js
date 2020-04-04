const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const JWT = require('jsonwebtoken')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local').Strategy
const app = express()


// application-level middlewares 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

// get Users 
const { Users } = require('./data')

//process configurations
//DEFAULT VALUES ARE SET 
const {
	PORT = 5000,
	JWT_SECRET = 'somethingfun',
	JWT_ISSUER = 'weefa'
} = process.env

//passport configurations

//@LOCAL STRATEGY OPTIONS
const localOptions = {
	usernameField: 'email',
	passwordField:'password',
}

//@JWT STRATEGY OPTIONS
const jwtOptions = {
	secretOrKey: JWT_SECRET,
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	issuer: JWT_ISSUER
}

passport.use(new LocalStrategy(localOptions,function(email,password,done){
	try{	
		const user = Users.find(user => user.email === email)
		if(!user){
			return done(null,false)
		}

		//if the user is registered,
		//check for the password
		const isMatch = user.password === password

		//if not match, handle it
		if(!isMatch){
			return done(null,false)
		}

		//if all verifications passed,
		//pass the user
		done(null,user)

	}catch(error){
		done(error)
	}
}))



passport.use(new JwtStrategy(jwtOptions,function(payload,done){
	try{
		const user = Users.find(user => (
			user.email === payload.sub
		))

		//if the user is not found, reject the request
		if(!user){
			return done(null,false)
		}

		//if the user is registered
		//and the jwt token is valid
		//supply the user
		done(null,user)

	}catch(error){
		done(error)
	}
}))


// @/register MIDDLEWARE
function registry(req,res,next){
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

//@ROUTES
app.get('/',function(req,res){
	res.send(`
		<h1>WELCOME TO MY API</h1>
		<a href="/login">LOGIN</a>
		<a href="/register">REGISTER</a>
	`)
})

app.get('/login', function(req,res){
		res.send(`
			<h4>PLEASE LOGIN</h4>
			<form action="/login" method="post">
				<input type="email" placeholder="email" name="email" />
				<input type="password" placeholder="password" name="password" />
				<input type="submit" />			
			</form>
			<a href="/register">Don't have an account?</a>
		`)
})

app.get('/register',function(req,res){
	res.send(`
			<h4>PLEASE REGISTER</h4>
			<form action="/register" method="post">
				<input type="email" placeholder="email" name="email" required/>
				<input type="password" placeholder="password" name="password" required/>
				<input type="submit" />			
			</form>
			<a href="/register">Already have an account?</a>
		`)
})

// @this endpoint is restricted to unauthorized users,
// only if the user is registered and JWT token is present ..
// in the request header 
app.get('/protected',passport.authenticate('jwt',{session:false}),function(req,res){
	res.json({
		protected_resource:"weefa is my pal"
	})
})


//@POST ROUTES FOR /login AND /register
//simple form handling without validation 
app.post('/login',passport.authenticate('local',{session:false,failureRedirect:'/login'}),function(req,res){
	//if the request gets here,
	// generate a jwt_token
	//and then send it to the user
	const { email } = req.user 
	const payload = {
		iss:JWT_ISSUER,
		sub:email
	}
	//sign the token with the payload
	JWT.sign(payload,JWT_SECRET,function(err,token){
		//send that token in the response as json
		res.json({token})
	})

})

app.post('/register',registry,function(req,res){
	//redirect the user to the login page
	//once he registered
	res.redirect('/login')
})


app.listen(PORT,function(){
	console.log(`SERVER RUNNING ON PORT:${PORT}`)
})