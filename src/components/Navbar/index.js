import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Stack } from '@mui/material';
import { TextField } from '@mui/material';
import { FormControl } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogContent } from '@mui/material';
import { Checkbox } from '@mui/material';
import { Select } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { InputLabel } from '@mui/material';


import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { NavLink as Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

function DrawerAppBar({user, items}) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleMenu = (event) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	const location = useLocation();

	const [dialogOpen, changeOpen] = React.useState(false);
	const handleClose2 = () => changeOpen(false);

	return (
		<>
		<Dialog
			open={dialogOpen}
			onClose={handleClose}
			sx={{margin: 'auto'}}
			fullWidth={true}
		>
			<DialogTitle>Přihlášení / registrace</DialogTitle>
			<DialogContent>
			<form action={process.env.REACT_APP_API_ADDR + "/api/v1/account/login?return=" + location.pathname} method="POST">
				<Stack direction="column" spacing={2}>
					<Stack direction="row" spacing={2}>
						<TextField name="email" label="E-Mail" variant="outlined" required />
						<FormControl>
							<InputLabel>Doména</InputLabel>
							<Select
								label="Doména"
								name="domain"
								value="@delta-studenti.cz"
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
			</DialogContent>
		</Dialog>
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar component="nav">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Delta Homepage</Typography>
	 				<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
						{
							items.map((item) => (
							item[0] !== 'divider' ? item[2] &&
							<Link style={({ isActive }) => (isActive ? {color: 'white', backgroundColor: 'red'} : {color: 'black'})} to={item[1]}>
								<Button key={item[0]} sx={{ color: '#fff' }}>
									{item[0]}
								</Button>
							</Link>
							: <Divider orientation="vertical" sx={{display: "inline", borderLeftWidth: 2, borderRightWidth: 2, bgcolor: "black" }} flexItem />
						))}
					</Box>
					<div>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							{user ?
								<Link to="/account" style={{ all: 'unset'}}>
									<MenuItem onClick={handleClose}><Typography>Účet</Typography></MenuItem>
								</Link>
								: <Button style={{ all: 'unset'}} onClick={() => changeOpen(true)}>
									<MenuItem onClick={handleClose}><Typography>Přihlásit se / Registrovat</Typography></MenuItem>
								  </Button>
							}
							{ user.role === 'admin' &&
								<Link to="/admin"><MenuItem onClick={handleClose}>Admin panel</MenuItem></Link>
							}
							{ user &&
								<form action={process.env.REACT_APP_API_ADDR + "/api/v1/account/logout?_method=DELETE&return=" + location.pathname} method="POST">
									<MenuItem onClick={handleClose}><button type="submit" style={{ all: 'unset'}}>Odhlásit se</button></MenuItem>
								</form>
							}
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		</Box>
		</>
	);
}

export default DrawerAppBar;