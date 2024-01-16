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
import {useState} from "react";
import firebase from 'firebase/compat/app'
import Switch from "@mui/joy/Switch";

export default function Header({user, routes, firestore, auth}) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const {mode, setMode} = useColorScheme();

  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");

  const usersCol = firestore.collection('users')

  const signInWithEmailPass = async () => {
    auth.signInWithEmailAndPassword(email, psw)
      .then(userCredential => {
        usersCol.doc(userCredential.user.uid).update({
          lastLoggedIn: firebase.firestore.FieldValue.serverTimestamp()
        })
      })
  }

  const register = () => {
    auth.createUserWithEmailAndPassword(email, psw)
      .then(userCredential => {
        userCredential.user.sendEmailVerification()

        usersCol.doc(userCredential.user.uid).set({
          id: userCredential.user.uid,
          lastLoggedIn: firebase.firestore.FieldValue.serverTimestamp(),
          name: "",
          surname: "",
          bk_username: "",
          hometown: "",
          intr: false,
          donated: 0,
          mbUploaded: 0.0,
          email: userCredential.user.email,
          typing_lesson: 0
        }, {merge: true})

        alert('Potvrzeni odeslano na email, prosim odkliknete ho.')
      })
  }

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
        { routes.map(r => r[0] != 'divider' && r[2] &&
          <NavLink key={r[1]} to={r[1]} sx={{ all: 'unset' }}>
            {({ isActive, isPending, isTransitioning }) => (
              <Button
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ color: isActive? "white" : 'black', backgroundColor: isActive? "red" : 'white', alignSelf: 'center' }}
              >
                {r[0]}
              </Button>
            )}
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
        <Typography style={{fontWeight: 'bold', position: 'relative', top: 5.5}}>Delta Homepage</Typography>
      </Box>

      <Box>
        <Stack direction="row" spacing={2}>
          <Typography
            component="label"
            endDecorator={
              <Switch
                checked={mode == 'dark'}
                onChange={() => setMode(mode === 'light' ? 'dark' : 'light')}
              />
            }
          >
            Tmavý režim
          </Typography>

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
                  <Box sx={{ ml: 1.5 }}><Typography textColor="text.tertiary">
                      {user ? <>{user?.name} {user?.surname}</> : "Nepřihlášen(a)"}
                  </Typography></Box>
                </Box>
              </MenuItem>

              { user ?
              <>
                <ListDivider />
                <MenuItem onClick={() => auth.signOut()}>
                  <LogoutRoundedIcon />
                  <Typography>Odhlasit</Typography>
                </MenuItem>

              </>

              :
              <>
                <ListDivider />
                <MenuItem><Input required value={email} type="email" onChange={(e) => setEmail(e.target.value)} variant="outlined" /></MenuItem>
                <MenuItem><Input required value={psw} type="password" onChange={(e) => setPsw(e.target.value)} variant="outlined" /></MenuItem>
                <MenuItem onClick={signInWithEmailPass}>Prihlasit se</MenuItem>
                <MenuItem onClick={register}>Registrovat se</MenuItem>
              </>
              }
            </Menu>
          </Dropdown>
        </Stack>
      </Box>
    </Box>
  );
}
