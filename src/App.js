import './App.css';

import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import React, { useState, useEffect, useRef } from 'react';

import { Helmet } from "react-helmet";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Slide from '@mui/material/Slide';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import SearchIcon from '@mui/icons-material/Search';

import IconButton from '@mui/material/IconButton';

import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import dayjs from 'dayjs';


import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// const _ = require('lodash');

const destinace = [
        "Pardubice",
        "Hradec Králové hl.n.",
       // "Opatovice nad Labem",
       // "Kolín",
       // "Choceň",
       // "Ústí nad Orlicí",
        "Všestary",
       // "Žamberk",
       // "Přelouč",
       // "Chrudim"
];

const hours_minutes = (mins) => `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`


const najdi_odjezdy = (array, pivot) => array.sort((a, b) => (a - b)).filter(e => (e >= pivot));

const capitalizeFirst = (text) => text.charAt(0).toUpperCase() + text.slice(1)


function najdi_spojeni (destinace, cas, controls) {

	if(destinace == "Pardubice") {
		controls.setDlgTitle("Jseš kokot?");
		controls.setDlgContent("Podívej se z okna nebo na mapu a MOŽNÁ ti dojde proč jseš debil...");
		controls.setOpen(true);
		return;
	} else if(destinace == "") {
		controls.setDlgTitle("Jseš kokot?");
		controls.setDlgContent("Zadej kam chceš jet trotle, nebo tě pošlu za vránama (mottl rizz)");
		controls.setOpen(true);
		return;
	}

	let time = cas["$H"] * 60 + cas["$M"];
 
	let cesty = {
		"Pardubice-Pardubičky" : null,
		"K Nemocnici"          : null,
		"Štrossova"            : null,
		"Na Okrouhlíku"        : null,
		"Zdravotnická škola"   : null,
		"Zámeček"              : null,
	};

	let worker = new Worker(process.env.PUBLIC_URL + '/worker.js', { type: "module" });
	worker.addEventListener('message', function(e) {
		cesty[e.data[0]] = e.data[1];
	}, false);

	let zacatky = Object.keys(cesty);
	for(const z of zacatky) {
		worker.postMessage({zacatek: z, konec: destinace, cas: time});
	}

	console.log(JSON.stringify(cesty))
	//console.log(propertiesToArray(cesty))

	//controls.setResult(cesty)

};

function propertiesToArray(obj) {

	const isObject = val => val && typeof val === 'object' && !Array.isArray(val);

	const addDelimiter = (a, b) => a ? `${a} - ${b}` : b;

	const paths = (obj = {}, head = '') => {
		return Object.entries(obj).reduce((product, [key, value]) => {

			let fullPath = addDelimiter(head, key);

			if(isObject(value)) {
				return product.concat(...paths(value, fullPath))
			} else if(Array.isArray(value) && value.some(v => isObject(v))) {
				return value.filter(v => isObject(v)).map(x => product.concat(...paths(x, fullPath))).filter(c => c.length > 0)
			} else {
				return product.concat(fullPath)
			}

		}, []);
	}

	return paths(obj);
}

function App() {

	const [selectedDest, setSelectedDest] = useState("");
	const [open, setOpen] = useState(false);
	const [dlgContent, setDlgContent] = useState("");
	const [dlgTitle, setDlgTitle] = useState("");

	const [result, setResult] = useState([]);

	const handleClose = () => setOpen(false);

	let dt = new Date();
	const [time, setTime] = useState(dayjs(`${dt.getHours()}:${dt.getMinutes()}`, 'HH:MM'));

	return (
	<div className="application">
	<Helmet>
		<meta charSet="utf-8" />
		<title>Hledání spojení</title>
	</Helmet>

	<div
		className="App"
		style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'column'
		}}
	>

	<h1>
		Delta Jede Domů
	</h1>

	<h2>
		Najdi si efektivní spojení domů
	</h2>

	{/* Dialog pro kokoty */}
	<Dialog
		open={open}
		onClose={handleClose}
	>
		<DialogTitle>{ dlgTitle }</DialogTitle>
		<DialogContent>
			<DialogContentText className="box">
				{ dlgContent }
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button variant="contained" disableElevation onClick={handleClose}>OK</Button>
		</DialogActions>
	</Dialog>

	<Stack direction="column" spacing={2}>
	<Stack direction="row" spacing={2}>
		<Autocomplete
			disablePortal
			id="destination-input"
			options={destinace}
			onChange={(event, value) => setSelectedDest(value)}
			sx={{ width: 250 }}
			renderInput={(params) => <TextField {...params} label="Destinace" />}
		/>

		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<TimePicker
				label="Čas odjezdu"
				value={time}
				ampm={false}
				sx={{width: 120}}
				onChange={(newTime) => setTime(newTime)}
			/>
		</LocalizationProvider>

		<FormControlLabel control={<Checkbox defaultChecked />} label="Zobrazit ceny" />

	</Stack>

		<Button
			variant="contained"
			size="small"
			onClick={() => najdi_spojeni(selectedDest, time, {setOpen, setDlgTitle, setDlgContent, setResult})}
			startIcon={<SearchIcon />}
		>
			Hledej, šmudlo!
		</Button>
	</Stack>

	</div>

	<br />
	<br />

	<Grid container spacing={4} justifyContent="center" alignItems="flex-start">
	</Grid>

	</div>
	);
}

export default App;
