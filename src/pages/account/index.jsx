import {
	FormControl,
	InputLabel,
	Select,
	MenuItem
} from '@mui/material'

import { useState } from 'react';

import {
	Box,
	TextField,
	Button,
	Stack,
	Checkbox,
	FormControlLabel
} from '@mui/material'

function Account() {
	const [mailPostfix, setMailPostfix] = useState('@delta-studenti.cz');

	const handleChange = (event) => {
		setMailPostfix(event.target.value);
	};

	return (
	<Box>
		<form action="http://localhost:8080/api/account">
			<Stack direction="column" spacing={2}>
				<Stack direction="row" spacing={2}>
					<TextField name="email" label="E-Mail" variant="outlined" />
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
					<FormControlLabel control={<Checkbox name="register" value="yes" />} label="Registrovat?" />
				</Stack>
				<Stack direction="row" spacing={2}>
					<Button type="submit" variant="contained">Odeslat</Button>
				</Stack>
			</Stack>
		</form>
	</Box>
	);
}

export default Account;