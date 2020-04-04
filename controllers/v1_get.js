// @GET /login 
// show login form 
exports.getLogin = function(req,res){
	res.send(`
		<h4>PLEASE LOGIN</h4>
		<form action="/login" method="post">
			<input type="email" placeholder="email" name="email" />
			<input type="password" placeholder="password" name="password" />
			<input type="submit" />			
		</form>
		<a href="/register">Don't have an account?</a>
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
			<input type="submit" />			
		</form>
		<a href="/register">Already have an account?</a>
	`)
}

// @GET /protected
// fetch protected resource, PS: user must be authenticated before accessing this endpoint
exports.getResource = function(req,res){
	res.json({ protected_resource:"Weefa is my pal" })
}