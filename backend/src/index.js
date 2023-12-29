require('dotenv').config();

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override');
const nodemailer = require('nodemailer')

const Database = require("./database.js");

const MongoStore = require('connect-mongo');

// global vars
global.database = new Database(process.env.MONGODB_ADDR, process.env.MONGODB_DBNAME);
global.frontendPublic = process.env.FRONTEND_PUBLIC
global.backendPublic = process.env.BACKEND_PUBLIC

global.smtpTransport = nodemailer.createTransport({
	pool: true,
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	secure: true, // use TLS
	auth: {
		user: process.env.MAIL_USERNAME,
		pass: process.env.MAIL_PASS,
	},
});

global.isAuth = function(req, res, next)
{
	if (req.isAuthenticated()) return next();
	res.status(401).redirect(global.frontendPublic);
}

global.isAuth_headless = function(req, res, next)
{
	if (req.isAuthenticated()) return next();
	res.status(401).json();
}


const apiV1 = require('./api/v1');
const initializePassport = require('../passport-config');

const ObjectId = require('mongodb').ObjectId;

const fs = require('fs')

const cors = require('cors')

const app = express();

const privateKey  = fs.readFileSync('/etc/letsencrypt/live/api.delta.home.kg/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/api.delta.home.kg/fullchain.pem', 'utf8');

const credentials = {key: privateKey, cert: certificate};

const httpsServer = https.createServer(credentials, app);

initializePassport(
	passport,
	email => database.findOne('users', {email: email}),
	id => database.findOne('users', {_id: new ObjectId(id)})
);

app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(express.json({limit: '25mb', extended: true }));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	store: MongoStore.create({
		client: global.database.dbClient,
		dbName: process.env.MONGODB_DBNAME
	})
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.use(cors({
    origin: true,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
})
);

app.use('/api/v1', apiV1);
httpsServer.listen(process.env.PORT);
