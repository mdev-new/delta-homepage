import 'react-native-gesture-handler';
// React
import { useState, useEffect } from 'react'

// React Native

// Firebase
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/functions'
import { useAuthState } from 'react-firebase-hooks/auth'

// react-native-paper
/*import {
} from 'react-native-paper'*/

// Navigation
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

// Custom
import Login from './Login'
import Home from './Home'
import Account from './Account'
import Bakalar from './Bakalar'
import Helpdesk from './Helpdesk'
import Social from './Social'
import Messaging from './Messaging'
import Connection from './connection/Connection'

const Drawer = createDrawerNavigator();

/// ---- Firebase init ----
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

// todo three dots menu

export default function App() {
  const [authenticatedUser, loading, err] = useAuthState(auth);
  const [userObject, _setUserObject] = useState(null);

  useEffect(() => {
    if(authenticatedUser)
      firestore.collection('users').doc(authenticatedUser.uid).get().then((docRef) => _setUserObject(docRef.data()))
    else _setUserObject(null);
  }, [authenticatedUser]);

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Account" component={Account} />
        <Drawer.Screen name="SchoolEntry" component={Login} />
        <Drawer.Screen name="Helpdesk" component={Helpdesk} />
        <Drawer.Screen name="Social" component={Social} />
        <Drawer.Screen name="Messaging" component={Messaging} />
        <Drawer.Screen name="Connection" component={Connection} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
