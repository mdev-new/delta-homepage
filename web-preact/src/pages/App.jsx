import { LocationProvider, Router } from 'preact-iso';
import { CssVarsProvider, CssBaseline, Typography} from "@mui/joy";


import Layout from '../components/Layout';
import Header from '../components/Header';

import Home from './home'
import Admin from './admin'
import Helpdesk from './helpdesk'
import Social from './social'
import Spojeni from './route'
import Pocasi from './weather'
import Bakalar from './bakalar'
import Account from './account'
import CodeHelp from './code-help'
import Writing from './ancient-torture'
import Zapisky from './note-marketplace'
import Wiki from './other/Wiki'
import ReditelskyFB from './other/Facebook'

import NotFound from './error/404.jsx';

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/functions'

import { useAuthState } from 'react-firebase-hooks/auth'

import { useState, useEffect } from 'react'

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

firestore.enablePersistence()

const routes = (user) => [
  ['Domov', '/', true],
  ['Social', '/social', true],
  ['Helpdesk', '/helpdesk', true],
  ['Code Help', '/code-help', true],
  ['Bakalář', '/bakalar', user != null],
//  ['Mount Blue', '/mb', auth],
  ['Spojení', '/spojeni', true],
  ['Globglobgabgalabovo doupě', '/writing', user != null],
  ['divider', 'divider'],
  ['Wiki', '/wiki', true],
//  ['Zápisky', '/zapisky', true],
  ['Ředitelský FB', '/fb', true],
  ['Počasí', '/pocasi', true],
  ['divider', 'divider'],
  ['Moodle', 'https://student.delta-studenti.cz', true],
  ['TopGun', 'https://domjudge.zapotocnylubos.com', true],
]

// todo: this is horrible. refactor.

export default function App() {
  const [authenticatedUser, loading, err] = useAuthState(auth);

  const [userObject, _setUserObject] = useState(null);
  useEffect(() => {
    if(authenticatedUser) {
      firestore.collection('users').doc(authenticatedUser.uid).onSnapshot(doc => _setUserObject(doc.data()))
    } else {
      _setUserObject(null);
    }
  }, [authenticatedUser]);

  return (
    <CssVarsProvider>
      <CssBaseline />
      <LocationProvider>
        <Layout.Root>
          <Layout.Header>
            <Header user={userObject} firestore={firestore} routes={routes(userObject)} auth={auth} />
          </Layout.Header>
          <div style={{minHeight:'85vh', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
            <Layout.Main>
              <Router>
                <Home path="/" user={userObject} />
                <Helpdesk path="/helpdesk" user={userObject} firestore={firestore} />
                <Social path="/social" user={userObject} firestore={firestore} />
                <Spojeni path="/spojeni" user={userObject} firestore={firestore} />
                <Pocasi path="/pocasi" user={userObject} firestore={firestore} />
                <Zapisky path="/zapisky" user={userObject} firestore={firestore} />
                <Wiki path="/wiki" user={userObject} firestore={firestore} />
                <ReditelskyFB path="/fb" user={userObject} firestore={firestore} />
                <CodeHelp path="/code-help" user={userObject} firestore={firestore} />
                <Bakalar path="/bakalar" user={userObject} firestore={firestore} />
                <Writing path="/writing" user={userObject} firestore={firestore} />
                <Account path="/account" user={userObject} firestore={firestore} />
                <Admin path="/admin" user={userObject} firestore={firestore} />
              </Router>
            </Layout.Main>
          </div>
          { userObject &&
            <Layout.Footer>
              <hr style={{backgroundColor: '#D3D3D3', height: '1px', border: 0}} />
              <>
              <marquee behavior="alternate">
              <Typography>Darováno: {Math.round(userObject.donated / 100)} kč&nbsp;
              <a target="_blank" rel="noreferrer noopener" href={`https://donate.stripe.com/test_aEUbJ0eLt9fCet2bIK?client_reference_id=${userObject.id}`}>
                <Typography>Darovat</Typography>
              </a></Typography>
              </marquee>
              </>
            </Layout.Footer>
          }
        </Layout.Root>
      </LocationProvider>
    </CssVarsProvider>
  );
}
