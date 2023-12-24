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
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/zdd" element={<ZDD />} />
						<Route exact path="/topgun" element={<TopGun />} />
						<Route exact path="/account" element={<Account />} />
						<Route exact path="/moodle" element={<Moodle />} />
					</Routes>
				</Box>
			</Box>
		</Router>
	);
}

export default App;