import {
	Box
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
		<Box>
		<p>Pardubice</p>
		<p>{pocasi.FeelsLikeC}</p>
		<p>{pocasi.humidity}</p>
		</Box>
	);
}

export default Pocasi;