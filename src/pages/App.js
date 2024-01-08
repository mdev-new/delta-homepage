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

import {useState} from 'react'

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

const routes = (user) => [
	['Domov', '/', true],
	['Social', '/social', true],
	['Helpdesk', '/helpdesk', true],
	['Code Help', '/code-help', true],
	['Bakalář', '/bakalar', user],
//	['Mount Blue', '/mb', auth],
	['Spojení', '/spojeni', true],
	['divider', 'divider'],
	['Wiki', '/wiki', true],
	['Zápisky', '/zapisky', true],
	['Ředitelský FB', '/fb', true],
	['Počasí', '/pocasi', true],
	['divider', 'divider'],
	['Moodle', 'https://student.delta-studenti.cz', true],
	['TopGun', 'https://domjudge.zapotocnylubos.com', true],
]

export default function App() {
	const [user, loading, err] = useAuthState(auth);
	
  return (
	 <Router>
	 <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Layout.Root>
	  	<Layout.Header>
          <Header user={user} firestore={firestore} routes={routes(!!auth.currentUser)} auth={auth} />
        </Layout.Header>
	  <Layout.Main>
	 	<Routes>
			<Route path="/" element={
				<>
				{auth.currentUser &&
					<h2 style={{textAlign: 'center'}}>Vitej, {auth.currentUser.email}!</h2>
				}
				</>
			} />
			<Route exact path="/helpdesk" element={<Helpdesk user={auth.currentUser} firestore={firestore} />} />
			<Route exact path="/social" element={<Social user={auth.currentUser} firestore={firestore} />} />
			<Route exact path="/spojeni" element={<Spojeni user={auth.currentUser} firestore={firestore} />} />
			<Route exact path="/pocasi" element={<Pocasi user={auth.currentUser} firestore={firestore} />} />
			<Route exact path="/zapisky" element={<Zapisky user={auth.currentUser} firestore={firestore} />} />
			<Route exact path="/wiki" element={<Wiki user={auth.currentUser} firestore={firestore} />} />
			<Route exact path="/fb" element={<ReditelskyFB user={auth.currentUser} firestore={firestore} />} />
			<Route exact path="/bakalar" element={<Bakalar user={auth.currentUser} firestore={firestore} />} />
			<Route exact path="/account" element={<Account user={auth.currentUser} firestore={firestore} />} />
			<Route exact path="/code-help" element={<CodeHelp user={auth.currentUser} firestore={firestore} />} />
	 	 </Routes>
	  </Layout.Main>
	  </Layout.Root>
	  </CssVarsProvider>
	 </Router>
  );
}

