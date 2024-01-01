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

function Account({user}) {

	const [changePass_open, openChangePass] = useState(false);
	const handleClose = () => openChangePass(false);

	return (
	<Box>
	{user &&
		<Box>
			<Stack spacing={2} direction="column">
				<form action={process.env.REACT_APP_API_ADDR + "/api/v1/account/accountInfo/update?_method=PUT"} method="POST">
					<Stack spacing={2} direction="row">
						<TextField name="name" label="Jmeno" variant="outlined" required />
						<TextField name="surname" label="Prijmeni" variant="outlined" required />
						<TextField name="bakalari_user" label="Uzivatelske jmeno Bakalaru" variant="outlined" required />
						<TextField name="bakalari_pass" label="Heslo Bakalaru" type="password" variant="outlined" required />
						<Button variant="contained" type="submit">Aktualizovat</Button>
						<Button variant="contained" onClick={() => openChangePass(true)}>Změnit heslo na Delta Homepage</Button>
					</Stack>
				</form>
			</Stack>
		</Box>
	}
	<Dialog
		open={changePass_open}
		onClose={handleClose}
		sx={{width: 558, margin: 'auto'}}
		fullWidth={true}
	>
		<DialogTitle>Změna hesla</DialogTitle>
		<form action={process.env.REACT_APP_API_ADDR + "/api/v1/account/accountInfo/changePass?_method=PUT"} method="POST">
			<DialogContent>
				<TextField name="oldpass" label="Staré heslo" type="password" variant="outlined" required />
				<TextField name="newpass" label="Nové heslo" type="password" variant="outlined" required />
			</DialogContent>
			<DialogActions>
				<Button variant="contained" type="submit">Aktualizovat</Button>
				<div style={{flex: '0.02 0 0'}} />
			</DialogActions>
		</form>
	</Dialog>
	</Box>
	);
}

export default Account;
