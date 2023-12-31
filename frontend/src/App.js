import {
	Content,
} from "@carbon/react";

import {
	BrowserRouter,
	Route,
	Routes
} from "react-router-dom";

import "./app.scss";
import Homepage from "./pages/home";
import ProfilePage from "./pages/profile";
import Helpdesk from "./pages/helpdesk";
import Social from "./pages/social";
import Spojeni from "./pages/spojeni";
import AdminPage from "./pages/admin";
import HeaderComponent from "./components/header";


import {
	User,
	Upload,
	Fork,
} from "@carbon/icons-react";

const items = [
	['/', 'Domu', User]
]

function App() {
	return (
		<BrowserRouter>
			<Content>
				<HeaderComponent />
			</Content>
		</BrowserRouter>
	);
}

export default App;
