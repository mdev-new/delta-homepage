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
} from '@mui/material'

function Account() {
	const [mailPostfix, setMailPostfix] = useState('@delta-studenti.cz');

	const handleChange = (event) => {
		setMailPostfix(event.target.value);
	};

	return (
	<Box>
		<Stack direction="column" spacing={2}>
			<Stack direction="row" spacing={2}>
				<TextField id="outlined-basic" label="E-Mail" variant="outlined" />
				<FormControl>
					<InputLabel id="demo-simple-select-label">Doména</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={mailPostfix}
						label="Doména"
						onChange={handleChange}
					>
						<MenuItem value="@delta-studenti.cz">@delta-studenti.cz</MenuItem>
						<MenuItem value="@delta-skola.cz">@delta-skola.cz</MenuItem>
					</Select>
				</FormControl>
			</Stack>
			<Stack direction="row" spacing={2}>
				<Button variant="contained">Přihlášení</Button>
				<Button variant="outlined">Registrace</Button>
			</Stack>
		</Stack>
	</Box>
	);
}

export default Account;