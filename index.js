const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// application-level middlewares 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//configurations
const { PORT } = require('./config')

//initialize passport strategies
require('./passport')

// define @ROUTES
const v1Endpoints = require('./routes/v1')

app.get('/',function(req,res){
	res.send(`
		<h1>WELCOME TO YOUR OWN API</h1>
		<a href="/login">LOGIN</a> | 
		<a href="/register">REGISTER</a> <br />
		<a href="/protected" > Protected Resource </a>
	`)
})

app.use('/', v1Endpoints)
// 
app.listen(PORT,() => console.log(`SERVER RUNNING ON PORT:${PORT}`))