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

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Account({auth, setAuth}) {
	const [mailPostfix, setMailPostfix] = useState('@delta-studenti.cz');

	const handleChange = (event) => {
		setMailPostfix(event.target.value);
	};

	const [changePass_open, openChangePass] = useState(false);
	const handleClose = () => openChangePass(false);

	return (
	<Box>
	{!auth ?
		<form action={process.env.REACT_APP_API_ADDR + "/api/v1/account/login"} method="POST">
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
	: 	<Box>
			<Stack spacing={2} direction="column">
				<form action={process.env.REACT_APP_API_ADDR + "/api/v1/account/updateInfo"} method="POST">
					<Stack spacing={2} direction="row">
						<TextField name="name" label="Jmeno" variant="outlined" required />
						<TextField name="surname" label="Prijmeni" variant="outlined" required />
						<TextField name="bakalari_user" label="Uzivatelske jmeno Bakalaru" variant="outlined" required />
						<TextField name="bakalari_pass" label="Heslo Bakalaru" type="password" variant="outlined" required />
						<Button variant="contained" type="submit">Aktualizovat</Button>
						<Button variant="contained" onClick={() => openChangePass(true)}>Změnit heslo na Delta Homepage</Button>
					</Stack>
				</form>
				<form action={process.env.REACT_APP_API_ADDR + "/api/v1/account/logout?_method=DELETE"} method="POST">
					<Button variant="contained" type="submit">Odhlásit</Button>
				</form>
			</Stack>
		</Box>
	}
	<Dialog
		open={changePass_open}
		onClose={handleClose}
		sx={{margin: 'auto'}}
		fullWidth={true}
	>
		<DialogTitle>Změna hesla</DialogTitle>
		<DialogContent>
			<form action={process.env.REACT_APP_API_ADDR + "/api/v1/account/changePass"} method="POST">
				<Stack spacing={2} direction="row">
					<TextField name="oldpass" label="Staré heslo" type="password" variant="outlined" required />
					<TextField name="newpass" label="Nové heslo" type="password" variant="outlined" required />
					<Button variant="contained" type="submit">Aktualizovat</Button>
				</Stack>
			</form>
		</DialogContent>
		<DialogActions>
			<Button variant="contained" disableElevation onClick={handleClose}>OK</Button>
		</DialogActions>
	</Dialog>
	</Box>
	);
}

export default Account;