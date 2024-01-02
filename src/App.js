import React from 'react';
import logo from './logo.svg';
import './App.css';

import Helpdesk from './pages/helpdesk'

import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

import { useAuthState } from 'react-firebase-hooks/auth'

firebase.initializeApp({
	apiKey: "AIzaSyDTmT_TH9iBdX4BRsIvBUTndbP5NG9OD24",
	authDomain: "delta-homepage.firebaseapp.com",
	databaseURL: "https://delta-homepage-default-rtdb.firebaseio.com",
	projectId: "delta-homepage",
	storageBucket: "delta-homepage.appspot.com",
	messagingSenderId: "1073883844055",
	appId: "1:1073883844055:web:2399adeca960b4a57d0f92"
})

const auth = firebase.auth()
const firestore = firebase.firestore()

const Auth = () => {

	const signInWithGgl = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider);
	}

	return !auth.currentUser ? (
		<button onClick={signInWithGgl}>Prihlasit se s Googlem</button>
	) : (
		<button onClick={() => auth.signOut()}>Sign out</button>
	);
}

function App() {

	const [user] = useAuthState(auth);

	return (
		<>
		<Auth />
		<Router>
		<Routes>
			<Route exact path="/helpdesk" element={<Helpdesk user={auth.currentUser} firestore={firestore} />} />
		</Routes>
		</Router>
		</>
	);
}

export default App;
