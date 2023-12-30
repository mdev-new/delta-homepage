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

import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { NavLink as Link } from 'react-router-dom'

function DrawerAppBar({user, items}) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar component="nav">
				<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Delta Homepage</Typography>
 				<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
					{
						items.map((item) => (
						item[0] !== 'divider' ?
						<Link style={({ isActive }) => (isActive ? {color: 'white', backgroundColor: 'red'} : {color: 'black'})} to={item[1]}>
							<Button key={item[0]} sx={{ color: '#fff' }}>
								{item[0]}
							</Button>
						</Link>
						: <Divider orientation="vertical" sx={{display: "inline"}} flexItem />
					))}
				</Box>
				{
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
							<Link to="/account"><MenuItem onClick={handleClose}>My account</MenuItem></Link>
						</Menu>
					</div>
				}
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default DrawerAppBar;