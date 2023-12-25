if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override');

const apiV1 = require('./api/v1');
const initializePassport = require('../passport-config');

const cors = require('cors')

const app = express();

const users = require('../database/users.json');
//const helpdesk_posts = require('./database/helpdesk.json');
//const social_posts = require('./database/social.json');

initializePassport(
	passport,
	email => users.find(user => user.email === email),
	id => users.find(user => user.id === id)
);

app.use(express.urlencoded({ limit: '10gb', extended: true }));
app.use(express.json({limit: '10gb', extended: true }));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: { sameSite: 'strict' },
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.use(cors({
    origin: "https://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
})
);

app.use('/api/v1', apiV1);
app.listen(process.env.PORT || 8080);

process.stdin.resume();

function exitHandler(options, exitCode) {
	// todo save the json
	process.exit();
}

[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
  process.on(eventType, exitHandler.bind(null, eventType));
})
