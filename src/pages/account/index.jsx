import {
	FormControl,
	InputLabel,
	Select,
	MenuItem
} from '@mui/joy'

import { useState, useEffect } from 'react';

import {
	Box,
	Input,
	Button,
	Stack,
	Checkbox,
	FormLabel
} from '@mui/joy'

import {
    Modal,
    ModalDialog,
    ModalClose,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/joy';

function Account({user}) {

	const [changePass_open, openChangePass] = useState(false);
	const handleClose = () => openChangePass(false);

	return (
        <Box>
        {user &&
            <Box>
                <Stack spacing={2} direction="column">
                    <form action={process.env.REACT_APP_API_ADDR + "/api/v1/account/accountInfo/update"} method="POST">
                        <Stack spacing={2} direction="row">
                            <FormControl required>
                                <FormLabel>
                                    Jmeno
                                </FormLabel>
                                <Input name="name" variant="outlined" />
                            </FormControl>
                            <FormControl required>
                                <FormLabel>
                                    Prijmeni
                                </FormLabel>
                                <Input name="surname" variant="outlined" />
                            </FormControl>
                            <FormControl required>
                                <FormLabel>
                                    Uzivatelske jmeno Bakalaru
                                </FormLabel>
                                <Input name="bakalari_user" variant="outlined" />
                            </FormControl>
                            <Button variant="contained" type="submit">Aktualizovat</Button>
                            <Button variant="contained" onClick={() => openChangePass(true)}>Změnit heslo na Delta Homepage</Button>
                        </Stack>
                    </form>
                </Stack>
            </Box>
        }
        <Modal
            open={changePass_open}
            onClose={handleClose}
            sx={{width: 558, margin: 'auto'}}
            fullWidth={true}
        >
            <ModalDialog>
            <ModalClose />
            <DialogTitle>Změna hesla</DialogTitle>
            <form action={process.env.REACT_APP_API_ADDR + "/api/v1/account/accountInfo/changePass"} method="POST">
                <DialogContent>
                    <FormControl required>
                        <FormLabel>
                            Staré heslo
                        </FormLabel>
                        <Input name="oldpass" type="password" variant="outlined" />
                    </FormControl>
                    <FormControl required>
                        <FormLabel>
                            Nové heslo
                        </FormLabel>
                        <Input name="newpass" type="password" variant="outlined" />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" type="submit">Aktualizovat</Button>
                    <div style={{flex: '0.02 0 0'}} />
                </DialogActions>
            </form>
            </ModalDialog>
        </Modal>
        </Box>
    );
}

export default Account;
