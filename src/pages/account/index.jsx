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