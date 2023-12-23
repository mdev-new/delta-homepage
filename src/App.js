import './App.css';

import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import React, { useState, useEffect, useCallback } from 'react';

import { Helmet } from "react-helmet";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';

import Card from '@mui/material/Card';

import Switch from '@mui/material/Switch';

import dayjs from 'dayjs';

import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';

import Typography from "@mui/material/Typography";

import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsBusFilledTwoToneIcon from '@mui/icons-material/DirectionsBusFilledTwoTone';
import TrainTwoToneIcon from '@mui/icons-material/TrainTwoTone';

import Popover from '@mui/material/Popover';

import Badge from '@mui/material/Badge';

import Slider from 'react-slide-out';
import 'react-slide-out/lib/index.css';

import _ from 'lodash-es';

import { najdi_spojeni } from './compute.js'
import { jizdni_rad_z_delty, jizdni_rad_na_deltu } from './jr.js'

import { useGeolocated } from "react-geolocated";
import { MapProvider, Map, MouseControl, KeyboardControl, ZoomControl, Marker, MarkerLayer, BASE_LAYERS} from 'mapy-cz-react';


const delta_stanice = {
	"DELTA": ["Pardubice-Pardubičky", "K Nemocnici", "Štrossova", "Na Okrouhlíku", "Nemocnice"],
	"Intr": [],
	"Zdrávka": ["Zdravotnická škola", "Zámeček"],
};

const delta_odjezdy = {
	"DELTA": ["Pardubice-Pardubičky", "K Nemocnici", "Štrossova", "Na Okrouhlíku", "Nemocnice"],
	"Intr": [],
	"Zdrávka": ["Zdravotnická škola", "Zámeček"],
	"Hradec Králové hl.n.": ["Hradec Králové hl.n."],
	"Všestary": ["Všestary"],
	//"Opatovice nad Labem",
	//"Kolín",
	//"Choceň",
	//"Ústí nad Orlicí",
	//"Žamberk",
	//"Přelouč",
	//"Chrudim",
	//"Dvůr Králové nad Labem"
}

const delta_prijezdy = {
	"Intr": [],
	"Zdrávka": ["Zdravotnická škola", "Zámeček"],
	"Hradec Králové hl.n.": ["Hradec Králové hl.n."],
	"Všestary": ["Všestary"],
	//"Opatovice nad Labem",
	//"Kolín",
	//"Choceň",
	//"Ústí nad Orlicí",
	//"Žamberk",
	//"Přelouč",
	//"Chrudim",
	//"Dvůr Králové nad Labem"
}

const destinace_na_deltu = {
	"DELTA": ["Pardubice-Pardubičky", "K Nemocnici", "Štrossova", "Na Okrouhlíku", "Nemocnice"],
};

function typeToIcon(params) {
	if (params.value.startsWith('Autobus')) {
		return <Badge max={999} badgeContent={params.value.split(' ')[1]} color="primary"><DirectionsBusFilledTwoToneIcon fontSize="large" /></Badge>;
	} else if(params.value.startsWith('Vlak')) {
		if(params.value.split(' ')[1] !== undefined)
			return <Badge max={999} badgeContent={params.value.split(' ')[1]} color="primary"><TrainTwoToneIcon fontSize="large" /></Badge>;
		else
			return <TrainTwoToneIcon fontSize="large" />;
	} else if(params.value.startsWith('Trolejbus')) {
		return <Badge max={999} badgeContent={params.value.split(' ')[1]} color="primary"><DirectionsBusFilledTwoToneIcon fontSize="large" /></Badge>;
	}
}

//https://stackoverflow.com/questions/58095186/can-switches-have-multiple-labels
const DoubleLabeledSwitch = ({labelLeft, labelRight, collapsed, setCollapsed}) => {

	return (
		<Stack direction="row" component="label" alignItems="center" justifyContent="center">
			<Typography>
				{labelLeft}
			</Typography>
			<Switch onChange={() => setCollapsed(prev => !prev)} checked={collapsed} />
			<Typography>
				{labelRight}
			</Typography>
		</Stack>
	);
}

function MousePopover({baseText, popOver}) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<div>
			<Typography
				aria-owns={open ? 'mouse-over-popover' : undefined}
				aria-haspopup="true"
				onClick={handlePopoverOpen}
				onDoubleClickCapture={handlePopoverClose}
			>
				{baseText}
			</Typography>
			<Popover
				id="mouse-over-popover"
				sx={{
					pointerEvents: 'none'
				}}
				open={open}
				anchorEl={anchorEl}
				PaperProps={{
				 	style: { width: '50%' },
				}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				onClose={handlePopoverClose}
				disableRestoreFocus
			>
				{popOver}
			</Popover>
		</div>
	);
}

function App() {

	const [selectedDest, setSelectedDest] = useState("Hradec Králové hl.n.");
	const [open, setOpen] = useState(false);
	const [dlgContent, setDlgContent] = useState("");
	const [dlgTitle, setDlgTitle] = useState("");

	const [result, setResult] = useState([]);

	const handleClose = () => setOpen(false);

	const [time, setTime] = useState(dayjs());

	const [start, setStart] = useState("DELTA");

	const [zDelty, setZDelty] = useState(true);

	const [sidebar, setSidebar] = useState(false);
	const [sidebarTitle, setSidebarTitle] = useState("");

	const [markers, setMarkers] = useState("")

	const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

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
		sx={{margin: 'auto'}}
		fullWidth={true}
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
			defaultValue="DELTA"
			options={zDelty ? Object.keys(delta_stanice) : Object.keys(delta_prijezdy)}
			onChange={(event, value) => setStart(value)}
			sx={{ width: 250 }}
			renderInput={(params) => <TextField {...params} label="Výchozí stanice" />}
		/>
		<Autocomplete
			disablePortal
			disabled={!zDelty}
			options={zDelty ? Object.keys(delta_prijezdy) : Object.keys(delta_prijezdy)}
			defaultValue="Hradec Králové hl.n."
			onChange={(event, value) => setSelectedDest(value)}
			sx={{ width: 250 }}
			renderInput={(params) => <TextField {...params} label="Destinace" />}
		/>

	</Stack>

		<Stack direction={{xs: 'column', sm: 'row'}} spacing={3.5}>
		<Stack direction="row" spacing={{xs: 0.3, md: 3}}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<TimePicker
					label="Čas odjezdu"
					value={time}
					ampm={false}
					sx={{width: 120}}
					onChange={(newTime) => setTime(newTime)}
				/>
			</LocalizationProvider>

			<FormControlLabel control={<Checkbox disabled />} label="Zobrazit ceny" />

		</Stack>
			<DoubleLabeledSwitch labelLeft="Na Deltu" labelRight="Z Delty" collapsed={zDelty} setCollapsed={setZDelty} />
		</Stack>

		<Button
			variant="contained"
			size="large"
			onClick={() => najdi_spojeni(zDelty ? delta_odjezdy : destinace_na_deltu, start, !zDelty ? "DELTA" : selectedDest, time, {setOpen, setDlgTitle, setDlgContent, setResult})}
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
		<DataGrid
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
					width: 70,
					align: 'center',
					headerAlign: 'center',
				},
				{ headerAlign: 'center', align: 'center', sortable: false, headerName: 'N/K', field: 'nastupiste', width: 1, renderCell: (params) => <Typography>{params.value}</Typography> },
				{ headerAlign: 'center', align: 'center', sortable: false, headerName: 'Odjezd', field: 'odjezd', width: 72, renderCell: (params) => <Typography>{params.value}</Typography> },
				{ headerAlign: 'center', align: 'center', sortable: false, headerName: 'Příjezd', field: 'prijezd', width: 72, renderCell: (params) => <Typography>{params.value}</Typography> },
				{ sortable: false, headerName: 'Trasa', field: 'cesta', flex: 1, renderCell: (params) => {
					let c = params.value.join(' - ')
					return <a href='#' onClick={(e) => {
						e.preventDefault()
						setSidebarTitle("Cesta " + c)
						setMarkers(
							Object.entries(jizdni_rad_z_delty).map(([k, v]) => {
								if(typeof v != 'string') {
									return <Marker enableCard={true} cardHeaderText={k} coords={{ latitude: v.info.coords[1], longitude: v.info.coords[0] }} />
								}
								return <></>
							}
						))
						setSidebar(true)
					}}>
						{c}
					</a>
				}},
			]}
			rows={cesty.filter(c => !_.isEmpty(c)).map(entry => { return {
				id: Math.random(),
				typ: entry[0][0],
				odjezd: entry[0][1],
				prijezd: entry[0][2],
				nastupiste: entry[0][3],
				cesta: [entry[1][0], entry[1][entry[1].length-1]]
			}})}
			rowHeight={58}
		/>
		</Card>
		</div>

		))
	}
	</Stack>

	<br />
	<br />

	{
		!isGeolocationAvailable ? <font size="20rem" color="red">Geolokace není dostupná. Funkce budou omezeny.</font>
		: !isGeolocationEnabled ? <font size="20rem" color="red">Geolokace není povolená. Funkce budou omezeny.</font>
		: !coords ? <font size="20rem" color="red">Nelze získat pozici.</font>
		: <Slider
			title={sidebarTitle}
			footer={
				<div style={{padding: '15px'}}>
					<Button variant="outlined" onClick={() => setSidebar(false)}>Zavřít</Button>
				</div>
			}
			isOpen={sidebar}
			onOutsideClick={() => setSidebar(false)}
		>
		<center><h3>Mapka</h3></center>
		<MapProvider center={{lat: coords.latitude, lng: coords.longitude }} mapLayers={[BASE_LAYERS.TURIST_NEW]} zoom={16} >
			<Map height="100%">
				<MarkerLayer>
					<Marker enableCard={true} cardHeaderText="Moje pozice" coords={{ latitude: coords.latitude, longitude: coords.longitude }} />
					{markers}
					{/*
						//[...new Set(Object.entries(jizdni_rad_z_delty).concat(Object.entries(jizdni_rad_na_deltu)))].map(st =>
						Object.entries(jizdni_rad_z_delty).map(([k, v]) => {
							if(typeof v != 'string') {
								return
								<Marker
									enableCard={true}
									cardHeaderText={k}
									coords={{
										latitude: 0, longitude: 0
									}
									}
								/>
							}
						}
						)
					*/}
				</MarkerLayer>
				<ZoomControl />
				<KeyboardControl />
				<MouseControl zoom pan wheel />
			</Map>
		</MapProvider>
		</Slider>
	}

	</div>
	);
}

export default App;
