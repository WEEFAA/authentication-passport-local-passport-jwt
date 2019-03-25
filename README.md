# Authentication with Passport

This is a very simple authentication 
with the help of passport-jwt and passport-local npm modules

# Clone it!

```bash
git clone git@github.com:WEEFAA/authentication-passport-local-passport-jwt.git passport-authentication
```

cd into it, in this case "cd passport-authentication"

# Init

Install all the dependencies 

```bash
npm install 
```

# Start the Server

```bash
npm run dev
```
[SERVER](http://localhost:5000)

## Protected Resource

Use postman to test if you can access the /protect endpoint 
with the jwt token you received, if you don't use postman 
try the chrome web extension Restlet Client.

# Stateless - No session

Since it's using jsonwebtoken/jwt, it is intended not used 
session because we're using jwt here.


## Suggestions

Don't hesitate to submit pull request to 
make this repo updated and make it better :))


