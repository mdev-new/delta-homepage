const app = require("express")();
const mysql = require('mysql');

const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root"
});

con.connect(function(err) {
	if (err) {
		throw err;
	} else {
		console.log("MySQL connected!");
	}
});

// maybe storovat data v js obj...

/// Account

const register = (req, res, next) => {
	res.json({

	});
}

const login = (req, res, next) => {
	res.json({
		apiKey: 0
	});
}

/// Social

const getPosts = (req, res, next) => {
	res.json({

	});
}

const post = (req, res, next) => {
	res.json({

	});
}

const getMessages = (req, res, next) => {
	res.json({

	});
}

const message = (req, res, next) => {
	res.json({

	});
}

const getProfile = (req, res, next) => {
	res.json({

	});
}

const initSql = `
CREATE TABLE IF NOT EXISTS users(
	ID PRIMARY KEY NOT NULL,
	username TEXT,
	password TEXT,
	email TEXT,
	class TEXT,
	bakalari_username TEXT,
	bakalari_pass TEXT,
	mtb_username TEXT,
	mtb_pass TEXT,
	moodle_username TEXT,
	moodle_pass TEXT,
	domjudge_username TEXT,
	domjudge_pass TEXT,
	role TEXT,
	topgun BOOLEAN,
	post_ids TEXT,
	search_history TEXT,
	following TEXT,
	followers TEXT,
	likes TEXT,
	comments TEXT);

CREATE TABLE IF NOT EXISTS social_posts(
	id INTEGER PRIMARY KEY,
	poster INT,
	text_content TEXT,
	binary_content BLOB,
	likes TEXT,
	comments TEXT
);

CREATE TABLE IF NOT EXISTS helpdesk_posts(
	id INTEGER PRIMARY KEY,
	poster INT,
	content TEXT,
	place TEXT,
	likes TEXT -- text representation of an array of ints (ids)
);
`

app.get("/register", register);
app.get("/login", login);

app.get("/getPosts", getPosts);
app.get("/post", post);
app.get("/getMessages", getMessages);
app.get("/message", message);

app.listen(8080, () => {
	console.log("Server running");
});