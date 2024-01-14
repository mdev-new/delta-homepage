import { Text, View } from 'react-native'
import { Button } from 'react-native-paper';

export default function Home({navigation}) {
	return (
		<View>
			<Text>Hello user</Text>
			<Button mode="contained" onPress={() => navigation.navigate('Login')} width={150}>
				Log in
			</Button>

			<Button mode="contained" onPress={() => navigation.navigate('Connection')} width={150}>
				Spojeni
			</Button>
		</View>
	);
}