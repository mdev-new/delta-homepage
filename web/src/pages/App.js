import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import {Input, Button} from '@mui/joy';

import Layout from '../components/Layout';
import Header from '../components/Header';

import Helpdesk from './helpdesk'
import Social from './social'
import Zapisky from './zapisky'
import Spojeni from './spojeni'
import Pocasi from './pocasi'
import Wiki from './wiki'
import ReditelskyFB from './fb'
import Bakalar from './bakalar'
import Account from './account'
import CodeHelp from './code-help'
import Writing from './ancient-torture'

import { useState, useEffect } from 'react'

import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/functions'

import { useAuthState } from 'react-firebase-hooks/auth'

const app = firebase.initializeApp({
	apiKey: "AIzaSyDTmT_TH9iBdX4BRsIvBUTndbP5NG9OD24",
	authDomain: "delta-homepage.firebaseapp.com",
	databaseURL: "https://delta-homepage-default-rtdb.firebaseio.com",
	projectId: "delta-homepage",
	storageBucket: "delta-homepage.appspot.com",
	messagingSenderId: "1073883844055",
	appId: "1:1073883844055:web:2399adeca960b4a57d0f92"
})

const auth = app.auth()
const firestore = app.firestore()
const functions = app.functions('europe-west1')

// todo enable only if on trusted device
// login - ask if on trusted device and enable this conditionally
firestore.enablePersistence()
	.catch(err => {
		switch(err.code) {
			case 'failed-precondition': {
				// multiple tabs are open, this is unsupported.
				break;
			}
			case 'unimplemented': {
				// browser doesn't implement features that enable persistence
				break;
			}

			default: break;
		}
	})

const routes = (user) => [
	['Domov', '/', true],
	['Social', '/social', true],
	['Helpdesk', '/helpdesk', true],
	['Code Help', '/code-help', true],
	['Bakalář', '/bakalar', user != null],
//	['Mount Blue', '/mb', auth],
	['Spojení', '/spojeni', true],
	['Psaní všemi deseti', '/writing', user != null],
	['divider', 'divider'],
	['Wiki', '/wiki', true],
//	['Zápisky', '/zapisky', true],
	['Ředitelský FB', '/fb', true],
	['Počasí', '/pocasi', true],
	['divider', 'divider'],
	['Moodle', 'https://student.delta-studenti.cz', true],
	['TopGun', 'https://domjudge.zapotocnylubos.com', true],
]

export default function App() {
	const [authenticatedUser, loading, err] = useAuthState(auth);

	const [userObject, _setUserObject] = useState(null);
	useEffect(() => {
		if(authenticatedUser) {
			firestore.collection('users').doc(authenticatedUser.uid).get().then((docRef) => _setUserObject(docRef.data()))

		} else {
			_setUserObject(null);
		}

	}, [authenticatedUser]);

	return (
	 <Router>
	 <CssVarsProvider disableTransitionOnChange>
	  <CssBaseline />
	  <Layout.Root>
		<Layout.Header>
		  <Header user={userObject} firestore={firestore} routes={routes(userObject)} auth={auth} />
		</Layout.Header>
	  <Layout.Main>
		<Routes>
			<Route path="/" element={
				<>
				{userObject &&
					<h2 style={{textAlign: 'center'}}>Vitej, {userObject.name}!</h2>
				}
				</>
			} />
			<Route exact path="/helpdesk" element={<Helpdesk user={userObject} firestore={firestore} />} />
			<Route exact path="/social" element={<Social user={userObject} firestore={firestore} />} />
			<Route exact path="/spojeni" element={<Spojeni user={userObject} firestore={firestore} />} />
			<Route exact path="/pocasi" element={<Pocasi user={userObject} firestore={firestore} />} />
			{/*<Route exact path="/zapisky" element={<Zapisky user={userObject} firestore={firestore} />} />*/}
			<Route exact path="/wiki" element={<Wiki user={userObject} firestore={firestore} />} />
			<Route exact path="/fb" element={<ReditelskyFB user={userObject} firestore={firestore} />} />
			<Route exact path="/code-help" element={<CodeHelp user={userObject} firestore={firestore} />} />
			{ userObject && <>
				<Route exact path="/bakalar" element={<Bakalar user={userObject} firestore={firestore} />} />
				<Route exact path="/writing" element={<Writing user={userObject} firestore={firestore} functions={functions} />} />
				<Route exact path="/account" element={<Account user={userObject} firestore={firestore} />} />
				</>
			}
		 </Routes>
	  </Layout.Main>
	  </Layout.Root>
	  </CssVarsProvider>
	 </Router>
	);
}

