import {useEffect, useState} from 'react'

import {
	Card,
	List,
	ListItem
} from '@mui/material'

function Bakalar({user}) {
	const [key, setKey] = useState("");
	const [rozvrh, setRozvrh] = useState({});

	useEffect(() => {
		if(!user) return;
		fetch("https://delta-skola.bakalari.cz/api/login", {
			method:"POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: `client_id=ANDR&grant_type=password&username=${user.bakalari_user}&password=${user.bakalari_pass}`
		})
		.then((response) => response.json())
		.then((res) => {
			setKey(res);
			console.log(res)
		})
		.catch((err) => {
			console.log(err);
		});
	}, [])

	useEffect(() => {
		if(key.access_token !== undefined) {
			fetch("https://delta-skola.bakalari.cz/api/3/timetable/actual?date=" + new Date().toISOString().split('T')[0], {
				method:"GET", 
				credentials: "include",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Authorization": `Bearer ${key.access_token}`
				},
			})
			.then((response) => response.json())
			.then((res) => {
				setRozvrh(res);
				console.log(res)
			})
			.catch((err) => {
				console.log(err);
			});
		}
	}, [key])

	return (
		<Card sx={{width: 200}}><List>
		{
			rozvrh.Days && rozvrh.Days.map(den => <ListItem>{den.DayType}</ListItem>)
		}
		</List></Card>
	);
}

export default Bakalar;
