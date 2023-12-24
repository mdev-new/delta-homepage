const app = require("express")();

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

const viewProfile = (req, res, next) => {
	res.json({

	});
}


app.get("/register", register);
app.get("/login", login);

app.get("/getPosts", getPosts);
app.get("/post", post);
app.get("/getMessages", getMessages);
app.get("/message", message);

app.listen(8080, () => {
	console.log("Server running");
});