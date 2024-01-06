import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Avatar from '@mui/joy/Avatar';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Tooltip from '@mui/joy/Tooltip';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import ListDivider from '@mui/joy/ListDivider';
import Drawer from '@mui/joy/Drawer';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import AccountCircle from '@mui/icons-material/AccountCircle';

import { NavLink } from 'react-router-dom'

import Navbar from './Navbar';

export default function Header({user, routes}) {
	const [drawerOpen, setDrawerOpen] = React.useState(false);

	return (
		<Box
			sx={{
				display: 'flex',
				flexGrow: 1,
				justifyContent: 'space-between',
			}}
		>
			<Stack
				direction="row"
				justifyContent="center"
				alignItems="center"
				spacing={1}
				sx={{ display: { xs: 'none', lg: 'flex' } }}
			>
				{ routes.map(r => r[0] != 'divider' &&
					<NavLink to={r[1]} sx={{ all: 'unset' }}>
						<Button
							variant="plain"
							color="neutral"
							size="sm"
							sx={{ alignSelf: 'center' }}
						>
							{r[0]}
						</Button>
					</NavLink>
				)}
			</Stack>
			<Box sx={{ display: { xs: 'inline-flex', lg: 'none' } }}>
				<IconButton variant="plain" color="neutral" onClick={() => setDrawerOpen(true)}>
					<MenuRoundedIcon />
				</IconButton>
				<Drawer
					sx={{ display: { xs: 'inline-flex', lg: 'none' } }}
					open={drawerOpen}
					onClose={() => setDrawerOpen(false)}
				>
					<ModalClose />
					<DialogTitle>Menu</DialogTitle>
					<Box sx={{ px: 1 }}>
						<Navbar items={routes} />
					</Box>
				</Drawer>
				<Typography style={{fontWeight: 'bold'}}>Delta Homepage</Typography>
			</Box>

			<Box>
				<Dropdown>
					<MenuButton
						variant="plain"
						size="sm"
					>
						<AccountCircle color="primary" fontSize="large" />
					</MenuButton>
					<Menu
						placement="bottom-end"
						size="sm"
						sx={{
							zIndex: '99999',
							p: 1,
							gap: 1,
							'--ListItem-radius': 'var(--joy-radius-sm)',
						}}
					>
						<MenuItem>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
								}}
							>
								<AccountCircle color="primary" fontSize="large" />
								<Box sx={{ ml: 1.5 }}>
									<Typography level="title-sm" textColor="text.primary">
										{user ? user.displayName : "Not logged in"}
									</Typography>
									<Typography level="body-xs" textColor="text.tertiary">
										{user && user.email}
									</Typography>
								</Box>
							</Box>
						</MenuItem>
						{ user && <>
						<ListDivider />
						<MenuItem>
							<LogoutRoundedIcon />
							<Button style={{all: 'unset' }}>Odhlasit</Button>
						</MenuItem>
						</>
						}
					</Menu>
				</Dropdown>
			</Box>
		</Box>
	);
}
