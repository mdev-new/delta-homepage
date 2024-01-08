import {
	Box,
	Card,
	CardContent,
	Typography
} from '@mui/joy'

import {
	useState,
	useEffect
} from 'react'

function Pocasi() {

	const [pocasi, setPocasi] = useState({});

	useEffect(() => {
		fetch('https://wttr.in/Pardubice?format=j1')
		.then((response) => response.json())
		.then(data => {
			setPocasi(data.current_condition[0])
		})
		.catch(err => console.log(err))
	}, [])

	return (
		<Card sx={{width: 400}}>
		<Typography level="title-lg">Pardubice</Typography>	
		<CardContent>
		<Typography>Timestamp: {pocasi.localObsDateTime}</Typography>
		<Typography>Pocitová teplota: {pocasi.FeelsLikeC} °C</Typography>
		<Typography>Vlhkost: {pocasi.humidity == 69 ? "nice" : pocasi.humidity} %</Typography>
		<Typography>Tlak: {pocasi.pressure}</Typography>
		<Typography>UV index: {pocasi.uvIndex}</Typography>
		<Typography>Viditelnost: {pocasi.visibility} km</Typography>
		</CardContent>
		</Card>
	);
}

export default Pocasi;
