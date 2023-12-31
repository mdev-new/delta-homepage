import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";

import { useState, useEffect } from 'react';

import Toolbar from '@mui/material/Toolbar';
import { Box } from "@mui/material"

import Navbar from "./components/Navbar";

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
import Zapisky from "./pages/zapisky";
import AdminPanel from "./pages/admin";

const routes = (auth) => [
	['Domov', '/', true],
	['Social', '/social', auth],
	['Helpdesk', '/helpdesk', true],
	['Bakalář', '/bakalar', auth],
//	['Mount Blue', '/mb', auth],
	['Spojení', '/zdd', true],
	['divider', 'divider'],
	['Wiki', '/wiki', true],
	['Ředitelský FB', '/fb', true],
	['Zápisky', '/zapisky', true],
	['Počasí', '/pocasi', true],
	['divider', 'divider'],
	['Moodle', 'https://student.delta-studenti.cz', auth],
	['TopGun', 'https://domjudge.zapotocnylubos.com', auth],
]

function App() {
	const [user, setUser] = useState(false);

	useEffect(() => {
		console.log(process.env.REACT_APP_API_ADDR + "/api/v1/account/authOk")
		fetch(process.env.REACT_APP_API_ADDR + "/api/v1/account/authOk", {
			method: "GET", 
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
			setUser(res.user.accountActive ? res.user : null);
			//console.log(res.user)
		})
		.catch((err) => {
			console.log(err);
		});
	}, []);

	return (
		<Router>
			<Box sx={{ display: 'flex' }}>
				<Navbar
					items={routes(user)}
					user={user}
				/>
				<Box
					component="main"
					sx={{ flexGrow: 1, p: 3 }}
				>
					<Toolbar sx={{sm: {height:0, display: 'none'}}} />
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/zdd" element={<ZDD />} />
						<Route exact path="/helpdesk" element={<Helpdesk user={user} />} />
						<Route exact path="/social" element={<Social user={user} />} />
						{user && <>
							<Route exact path="/bakalar" element={<Bakalar />} />
							<Route exact path="/moodle" element={<Moodle />} />
							<Route exact path="/topgun" element={<TopGun />} />
							</>
						}
						<Route exact path="/account" element={<Account user={user} />} />
						<Route exact path="/wiki" element={<Wiki />} />
						<Route exact path="/fb" element={<ReditelskyFB />} />
						<Route exact path="/pocasi" element={<Pocasi />} />
						<Route exact path="/unauthorized" element={<NotAuth />} />
						<Route exact path="/zapisky" element={<Zapisky />} />
						{ user.role === 'admin' &&
							<Route exact path="/admin" element={<AdminPanel />} />
						}
						<Route
							path="*"
							element={<h2>Not found or authorized</h2>}
						/>
					</Routes>
				</Box>
			</Box>
		</Router>
	);
}

export default App;