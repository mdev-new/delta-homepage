if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override');

const Database = require("./database.js");
global.database = new Database("mongodb://127.0.0.1:27017", 'delta-homepage');

const apiV1 = require('./api/v1');
const initializePassport = require('../passport-config');

const ObjectId = require('mongodb').ObjectId;

const fs = require('fs')

const cors = require('cors')

const app = express();

initializePassport(
	passport,
	email => database.findOne('users', {email: email}),
	id => database.findOne('users', {_id: new ObjectId(id)})
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
