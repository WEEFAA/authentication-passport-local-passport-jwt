// @GET /login 
// show login form 
exports.getLogin = function(req,res){
	res.send(`
		<h4>PLEASE LOGIN</h4>
		<form action="/login" method="post">
			<input type="email" placeholder="email" name="email" />
			<input type="password" placeholder="password" name="password" />
			<input type="submit" value="Login"/>			
		</form>
		<a href="/register">Don't have an account?</a> <br />
		<a href="/">Home</a>
	`)
}

// @GET /register
// show register form
exports.getRegister = function(req,res){
	res.send(`
		<h4>PLEASE REGISTER</h4>
		<form action="/register" method="post">
			<input type="email" placeholder="email" name="email" required/>
			<input type="password" placeholder="password" name="password" required/>
			<input type="submit" value="Register"/>			
		</form>
		<a href="/login">Already have an account?</a> <br />
		<a href="/">Home</a>
	`)
}

// @GET /protected
// fetch protected resource, PS: user must be authenticated before accessing this endpoint
exports.getResource = function(req,res){
	res.json({ 
		msg: "This is just a demonstration on how jwt is used.",
		note_1: "However, you musn't send the token on request query string like this. Look at your URL bar.",
		note_2: "Token must be sent on Authorization header",
		token:`${req.query.token || ""}` 	
	})
}