const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const sessionSecret = process.env.SESSION_SECRET || 'mark it zero';
const adminPassword = process.env.ADMIN_PASSWORD || 'iamthewalrus';


passport.use(adminStrategy());
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));
const authenticate = passport.authenticate('local');


function ensureAdmin(req, res, next) {
	const isAdmin = req.user && req.user.username === 'admin';
	if (isAdmin) return next();

	const err = new Error('Unauthorized');
	err.statusCode = 401;
	next(err);	
} 

function adminStrategy() {

	return new Strategy(function(username, password, cb) {
		const isAdmin = (username === 'admin') && (password === adminPassword);
		if (isAdmin) cb(null, { username: 'admin' });

		cb(null, false);
	}); 
}

function login(req, res, next) {
	res.json({ success: true });
}

function session() {
	return 	expressSession({
		secret: sessionSecret,
		resave: false,
		saveUninitialized: false
	});
}

function setMiddleware(app) {
	app.use(session());
	app.use(passport.initialize());
	app.use(passport.session());
}


module.exports = {
	setMiddleware,
	ensureAdmin,
	authenticate,
	login
};