const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { Strategy: LocalStrategy } = require('passport-local')

//dummy data
const { Users } = require('./../data')

//config || env
const { JWT_SECRET, JWT_ISSUER } = require('./../config')

//passport configurations

//@LOCAL STRATEGY OPTIONS
const localOptions = {
	usernameField: 'email',
	passwordField:'password'
}

//@JWT STRATEGY OPTIONS
const jwtOptions = {
	secretOrKey: JWT_SECRET,
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	issuer: JWT_ISSUER
}

//setup passport strategies
passport.use(new LocalStrategy(localOptions,localStrategyVerifyCallback)) //local
passport.use(new JwtStrategy(jwtOptions, jwtStrategyVerifyCallback))


//local strategy function
function localStrategyVerifyCallback(username, password, done){
	try{
		//fetch requested user
		const user = Users.find(user => user.email === username)
		//if user's not found, reject
		if(!user) return done(null, false)
		// if there's a user but password credential is wrong, reject
		if(user && user.password !== password) return done(null, false)
		// otherwise, authorize user ! logged in
		return done(null, user)
	}catch(e){
		console.warn('Something went wrong on verifying local authentication')
		console.error(e.stack)
	}
}

//jwt strategy function
function jwtStrategyVerifyCallback(jwt_payload, done){
	try{
		// fetch requested user with 'sub' payload
		const user = Users.find(user => user.email === jwt_payload.sub)
		// if user's not found
		if(!user) return done(null, false)
		// otherwise 
		return done(null, user)
	}catch(e){
		console.warn('Something went wrong on verifying jwt authentication')
		console.error(e.stack)
	}
}