import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";

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

function App() {
	return (
		<Router>
			<Box sx={{ display: 'flex' }}>
				<Navbar
					drawer={Drawer}
				/>
				<Box
					component="main"
					sx={{ flexGrow: 1, p: 3 }}
				>
					<Toolbar sx={{sm: {height:0, display: 'none'}}} />
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/zdd" element={<ZDD />} />
						<Route exact path="/topgun" element={<TopGun />} />
						<Route exact path="/account" element={<Account />} />
						<Route exact path="/moodle" element={<Moodle />} />
						<Route exact path="/bakalar" element={<Bakalar />} />
						<Route exact path="/helpdesk" element={<Helpdesk />} />
						<Route exact path="/social" element={<Social />} />
						<Route exact path="/wiki" element={<Wiki />} />
						<Route exact path="/fb" element={<ReditelskyFB />} />
					</Routes>
				</Box>
			</Box>
		</Router>
	);
}

export default App;