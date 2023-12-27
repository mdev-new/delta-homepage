import {
	FormControl,
	InputLabel,
	Select,
	MenuItem
} from '@mui/material'

import { useState, useEffect } from 'react';

import {
	Box,
	TextField,
	Button,
	Stack,
	Checkbox,
	FormControlLabel
} from '@mui/material'

function Account({auth, setAuth}) {
	const [mailPostfix, setMailPostfix] = useState('@delta-studenti.cz');

	const handleChange = (event) => {
		setMailPostfix(event.target.value);
	};

	useEffect(() => {
		fetch("http://localhost:8080/api/v1/account/authOk", {
			method:"GET", 
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"Access-Control-Allow-Credentials": true,
			},
		})
		.then((response) => {
			if (response.status === 200) return response.json();
			throw new Error("authentication has been failed!");
		})
		.then((res) => {
			setAuth(res.auth);
			console.log(res.user)
		})
		.catch((err) => {
			console.log(err);
		});
	}, []);

	return (
	<Box>
	{!auth ?
		<form action="http://localhost:8080/api/v1/account/login" method="POST">
			<Stack direction="column" spacing={2}>
				<Stack direction="row" spacing={2}>
					<TextField name="email" label="E-Mail" variant="outlined" required />
					<FormControl>
						<InputLabel>Doména</InputLabel>
						<Select
							value={mailPostfix}
							label="Doména"
							name="domain"
							onChange={handleChange}
						>
							<MenuItem value="@delta-studenti.cz">@delta-studenti.cz</MenuItem>
							<MenuItem value="@delta-skola.cz">@delta-skola.cz</MenuItem>
						</Select>
					</FormControl>
					<TextField name="password" label="Heslo" type="password" variant="outlined" required />
					<FormControlLabel control={<Checkbox name="register" value="yes" />} label="Registrovat?" />
				</Stack>
				<Stack direction="row" spacing={2}>
					<Button type="submit" variant="contained">Odeslat</Button>
				</Stack>
			</Stack>
		</form>
	: 	<form action="http://localhost:8080/api/v1/account/logout?_method=DELETE" method="POST">
			<Button variant="contained" type="submit">Odhlásit</Button>
		</form>
	}
	</Box>
	);
}

export default Account;