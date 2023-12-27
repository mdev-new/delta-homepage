import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";

import { useState, useEffect } from 'react';

import Toolbar from '@mui/material/Toolbar';
import { Box } from "@mui/material"

import Navbar from "./components/Navbar";
import Drawer from "./components/Navbar/drawer.js";

import Home from "./pages";
import ZDD from "./pages/zdd";
import Account from "./pages/account";
import TopGun from "./pages/topgun";
import Moodle from "./pages/moodle";
import Helpdesk from "./pages/helpdesk";
import Social from "./pages/social";
import Wiki from "./pages/wiki";
import ReditelskyFB from "./pages/fb";
import Bakalar from "./pages/bakalar";
import Pocasi from "./pages/pocasi";
import NotAuth from "./pages/not_auth";

const routes = (auth) => [
	['Social', '/social', auth],
	['Helpdesk', '/helpdesk', true],
	['Bakalář', '/bakalar', auth],
	['Moodle', '/moodle', auth],
	['Mount Blue', '/mb', auth],
	['TopGun', '/topgun', auth],
	['Wiki', '/wiki', true],
	['Ředitelský FB', '/fb', true],
	['Spojení', '/zdd', true],
	['Účet', '/account', true],
	['Počasí', '/pocasi', true]
]

function App() {
	const [auth, setAuth] = useState(false);

	useEffect(() => {
		fetch("http://localhost:8080/api/v1/account/authOk", {
			method:"GET", 
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"Access-Control-Allow-Credentials": true,
			},
		})
		.then((response) => {
			if (response.status === 200) return response.json();
			throw new Error("authentication has been failed!");
		})
		.then((res) => {
			setAuth(res.auth);
			console.log(res.user)
		})
		.catch((err) => {
			console.log(err);
		});
	}, []);

	return (
		<Router>
			<Box sx={{ display: 'flex' }}>
				<Navbar
					drawer={<Drawer routes={routes(auth)} auth={auth} />}
					auth={auth}
				/>
				<Box
					component="main"
					sx={{ flexGrow: 1, p: 3 }}
				>
					<Toolbar sx={{sm: {height:0, display: 'none'}}} />
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/zdd" element={<ZDD />} />
						<Route exact path="/helpdesk" element={<Helpdesk auth={auth} />} />
						<Route exact path="/social" element={<Social auth={auth} />} />
						{auth && <>
							<Route exact path="/bakalar" element={<Bakalar />} />
							<Route exact path="/moodle" element={<Moodle />} />
							<Route exact path="/topgun" element={<TopGun />} />
							</>
						}
						<Route exact path="/account" element={<Account auth={auth} setAuth={setAuth}/>} />
						<Route exact path="/wiki" element={<Wiki />} />
						<Route exact path="/fb" element={<ReditelskyFB />} />
						<Route exact path="/pocasi" element={<Pocasi />} />
						<Route exact path="/unauthorized" element={<NotAuth />} />
					</Routes>
				</Box>
			</Box>
		</Router>
	);
}

export default App;