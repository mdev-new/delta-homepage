import {
	Box,
	Card,
	CardContent,
	CardHeader
} from '@mui/material'

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
		<CardHeader title="Pardubice" />
		<CardContent>
		<p>Timestamp: {pocasi.localObsDateTime}</p>
		<p>Pocitová teplota: {pocasi.FeelsLikeC} °C</p>
		<p>Vlhkost: {pocasi.humidity}</p>
		<p>Tlak: {pocasi.pressure}</p>
		<p>UV index: {pocasi.uvIndex}</p>
		<p>Tlak: {pocasi.pressure}</p>
		<p>Viditelnost: {pocasi.visibility} km</p>
		</CardContent>
		</Card>
	);
}

export default Pocasi;