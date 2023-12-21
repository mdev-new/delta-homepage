import './App.css';

import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

import { Helmet } from "react-helmet";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Slide from '@mui/material/Slide';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import { useGridApiRef } from '@mui/x-data-grid';
import { DataGridPro, GridApiPro } from '@mui/x-data-grid-pro';

import SearchIcon from '@mui/icons-material/Search';

import IconButton from '@mui/material/IconButton';

import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import dayjs from 'dayjs';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';

import Box from '@mui/material/Box';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import log from './log.js'

import { jizdni_rad } from './jr.js'

import Chip from '@mui/material/Chip';

import DirectionsBusFilledTwoToneIcon from '@mui/icons-material/DirectionsBusFilledTwoTone';

import TrainTwoToneIcon from '@mui/icons-material/TrainTwoTone';

import Badge from '@mui/material/Badge';

const _ = require('lodash');


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

//https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
const objectMap = (obj, fn) => Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]))

const hours_minutes = (mins) => `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`


const capitalizeFirst = (text) => text.charAt(0).toUpperCase() + text.slice(1)

function najdi(zacatek, konec, cas) {

	if(!(zacatek in jizdni_rad)) return null;

	let linka = jizdni_rad[zacatek]; // toto je garantovano

	log("linka", linka)

	let casy = linka.map(odjezd => odjezd.cas);
	let odjezdy = casy.filter(o => o >= cas);

	let _moznosti = {}

	for(const odjezd of odjezdy.slice(0, 2)) {

		let indexSpoje = linka.findIndex(p => p.cas == odjezd)
		if(indexSpoje == -1) return null; // dnes uz nic nejede

		let spoj = linka[indexSpoje];
		let zastavky = spoj.zastavky

		let typ = capitalizeFirst(spoj.typ)

		if(spoj.typ == "trol" || spoj.typ == "bus") {
			if(spoj.typ == "trol") typ = "Trolejbus";
			else if(spoj.typ == "bus") typ = "Autobus";
			typ += " " + spoj.cislo_linky;
		}

		let cesta = [
			[
				typ,
				`${hours_minutes(spoj.cas)}`,
				`${hours_minutes(spoj.cas+(spoj.zastavky.filter(f => f.name != zacatek)[0].time))}`,
				spoj.zastavky.filter(f => f.name != zacatek)[0].nastupiste
			],
			[...(zastavky.map(z => z.name))]
		]

		for(const stanice of zastavky.slice(1)) {

			let s = (typeof jizdni_rad[stanice.name] == 'string') ? jizdni_rad[stanice.name] : stanice.name;

			if(_moznosti[s] === undefined) _moznosti[s] = [];

			if(s == konec) {
				_moznosti[stanice.name].push({prijezd: cesta});
				break;
			}


			let found = najdi(s, konec, spoj.cas + stanice.time)

			if(found != null) { // found == null = tudy cesta fakt nevede

				_moznosti[s].push({prijezd: cesta, odjezd: found})
			}

		}
	}


	return _moznosti;

}

// i hate this algorithm with everything i have
// it is rather stupid and only assumes one route for each stop will ever be.

// todo zase vracime nekompletni cesty

function parse(storage, object, zacatek = "", depth = 0) {
	if(object == undefined) return null;

	if((!("odjezd" in object)) && ("prijezd" in object)) { // konecna

		return object.prijezd

	} else if(!("prijezd" in object) && !("odjezd" in object)) { // list moznosti kam dal
		for(const [key, value] of Object.entries(object)) {

			let _zacatek = (depth == 0) ? key : zacatek;

			if(!(_zacatek in storage)) storage[_zacatek] = [];
			let next = parse(storage, value, _zacatek, depth + 1);
			//log("next", next)
			if(next != null && next != undefined) {
				storage[_zacatek].push(next)
			}
		}
		return;
	} else if(("odjezd" in object)) {
		let next = parse(storage, object.odjezd, zacatek, depth+1)

		if(next == undefined && object.prijezd != undefined) {
			return object.prijezd
		}
		else if(object.prijezd != undefined) {
			return next
		}
		else {
			return next
		}
	} else {
		log("Something went wrong?")
	}
}

function najdi_spojeni (zacatek, destinace, cas, controls) {

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

	log(cas)
	let time = cas["$H"] * 60 + cas["$M"];

	let cesty = {}

	switch(zacatek) {
	case "DELTA":
	case "": {
		cesty["Pardubice-Pardubičky"] = { odjezd: najdi("Pardubice-Pardubičky", destinace, time) };
		cesty["K Nemocnici"         ] = { odjezd: najdi("K Nemocnici"         , destinace, time) };
		cesty["Štrossova"           ] = { odjezd: najdi("Štrossova"           , destinace, time) };
		cesty["Na Okrouhlíku"       ] = { odjezd: najdi("Na Okrouhlíku"       , destinace, time) };
		cesty["Nemocnice"           ] = { odjezd: najdi("Nemocnice"           , destinace, time) };
		break;
	}

	case "Zdrávka": {
		cesty["Zdravotnická škola"  ] = { odjezd: najdi("Zdravotnická škola"  , destinace, time) };
		cesty["Zámeček"             ] = { odjezd: najdi("Zámeček"             , destinace, time) };
		break;
	}

	default: {
		cesty[zacatek] = {odjezd: najdi(zacatek, destinace, time)};
		break;
	}
	}

	log(cesty, JSON.stringify(cesty))

	let objekt = {}
	parse(objekt, cesty)

	// poor man's object.filter()
	{
		let newobj = {}
		for(const k of Object.keys(objekt)) {
			if(!(objekt[k] == undefined || objekt[k].length == 0)) {
				newobj[k] = _.uniqWith(objekt[k].sort((a, b) => b[0][1].localeCompare(a[0][1])), _.isEqual);
			}
		}

		objekt = newobj;
	}

	let res = objectMap(objekt, (v) => {
		v.reverse();
		return v;
	})

	console.log("res", res)

	controls.setResult(res)

};

const compareArrays = (a, b) =>
  a.length === b.length && a.every((element, index) => element === b[index]);

function typeToIcon(params) {
	if (params.value.startsWith('Autobus')) {
		return <Badge max={999} badgeContent={params.value.split(' ')[1]} color="primary"><DirectionsBusFilledTwoToneIcon /></Badge>;
	} else if(params.value.startsWith('Vlak')) {
		return <TrainTwoToneIcon />;
	} else if(params.value.startsWith('Trolejbus')) {
		return <Badge max={999} badgeContent={params.value.split(' ')[1]} color="primary"><DirectionsBusFilledTwoToneIcon /></Badge>;
	}
}

export default function App() {

	const [selectedDest, setSelectedDest] = useState("Hradec Králové hl.n.");
	const [open, setOpen] = useState(false);
	const [dlgContent, setDlgContent] = useState("");
	const [dlgTitle, setDlgTitle] = useState("");

	const [result, setResult] = useState([]);

	const handleClose = () => setOpen(false);

	const [time, setTime] = useState(dayjs());

	const [start, setStart] = useState("DELTA");

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

	<h1>Delta Jede Domů</h1>
	<h2>Najdi si efektivní spojení domů</h2>

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
	<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
		<Autocomplete
			disablePortal
			defaultValue="DELTA"
			options={['DELTA', 'Zdrávka'].concat(Object.keys(jizdni_rad).filter(n => !['Štrossova', 'K Nemocnici', 'Nemocnice', 'Na Okrouhlíku', 'Pardubice-Pardubičky', 'Zámeček', 'Zdravotnická škola'].includes(n) && typeof jizdni_rad[n] != 'string'))}
			onChange={(event, value) => setStart(value)}
			sx={{ width: 250 }}
			renderInput={(params) => <TextField {...params} label="Výchozí stanice" />}
		/>
		<Autocomplete
			disablePortal
			options={destinace}
			defaultValue="Hradec Králové hl.n."
			onChange={(event, value) => setSelectedDest(value)}
			sx={{ width: 250 }}
			renderInput={(params) => <TextField {...params} label="Destinace" />}
		/>

		<Stack direction="row" spacing={0.3}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<TimePicker
					label="Čas odjezdu"
					value={time}
					ampm={false}
					sx={{width: 120}}
					onChange={(newTime) => setTime(newTime)}
				/>
			</LocalizationProvider>

			<FormControlLabel control={<Checkbox disabled />} label="Ceny" />
		</Stack>

	</Stack>

		<Button
			variant="contained"
			size="large"
			onClick={() => najdi_spojeni(start, selectedDest, time, {setOpen, setDlgTitle, setDlgContent, setResult})}
			startIcon={<SearchIcon />}
		>
			Hledej, šmudlo!
		</Button>
	</Stack>

	</div>

	<br />
	<br />


	<Stack direction="column" alignItems="center" spacing={3}>
	{
		Object.entries(result).filter(([k, v]) => v[0].length != 0).map(([stanice, cesty]) => (

		<div className="hello">
		<Card>
		<DataGridPro
			autoHeight
			disableColumnFilter
			disableColumnMenu
			disableColumnSelector
			disableDensitySelector
			disableRowSelectionOnClick
			hideFooterSelectedRowCount={true}
			hideFooterPagination={true}
			hideFooter={true}
			disableColumnResize={true}
			sx={{'& .MuiDataGrid-columnSeparator': {display: 'none'}}}
			columns={[
				{
					resizable: false,
					sortable: false,
					headerName: 'Typ',
					field: 'typ',
					renderCell: (params) => {
						return typeToIcon(params);
    				},
    				width: 60,
    				align: 'center',
    				headerAlign: 'center',
    			},
				{ headerAlign: 'center', align: 'center', sortable: false, headerName: 'N/K', field: 'nastupiste', width: 40 },
				{ headerAlign: 'center', align: 'center', sortable: false, headerName: 'Odjezd', field: 'odjezd', width: 72 },
				{ headerAlign: 'center', align: 'center', sortable: false, headerName: 'Příjezd', field: 'prijezd', width: 72 },
				{ sortable: false, headerName: 'Trasa', field: 'cesta', flex: 1},
			]}
	  		rows={cesty.filter(c => !_.isEmpty(c)).map(entry => { return {
	  			id: Math.random(),
	  			typ: entry[0][0],
				odjezd: entry[0][1],
				prijezd: entry[0][2],
				nastupiste: entry[0][3],
				cesta: [entry[1][0], entry[1][entry[1].length-1]].join(' - ')
	  		}})}
	  		rowHeight={48}
		/>
		</Card>
		</div>

		))
	}
	</Stack>

	<br />
	<br />

	</div>
	);
}
