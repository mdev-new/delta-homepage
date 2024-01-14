import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { PaperProvider } from 'react-native-paper';

import App from './App';

const Main = () => {
	return (<PaperProvider><App /></PaperProvider>);
}

registerRootComponent(Main);
