import './App.css';

import Button from '@mui/joy/Button';

import TextField from '@mui/joy/TextField';
import Autocomplete from '@mui/joy/Autocomplete';

import React, { useState, useEffect, useCallback } from 'react';

import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import DialogActions from '@mui/joy/DialogActions';
import DialogContent from '@mui/joy/DialogContent';
import DialogTitle from '@mui/joy/DialogTitle';

import Stack from '@mui/joy/Stack';
import Grid from '@mui/joy/Grid';

import Card from '@mui/joy/Card';

import Switch from '@mui/joy/Switch';

import dayjs from 'dayjs';

import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import Checkbox from '@mui/joy/Checkbox';

import Box from '@mui/joy/Box';
import FormLabel from '@mui/joy/FormLabel';

import Typography from "@mui/joy/Typography";

import IconButton from '@mui/joy/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsBusFilledTwoToneIcon from '@mui/icons-material/DirectionsBusFilledTwoTone';
import TrainTwoToneIcon from '@mui/icons-material/TrainTwoTone';

import Badge from '@mui/joy/Badge';

import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';

import Sheet from '@mui/joy/Sheet';

import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as extendMaterialTheme,
  THEME_ID
} from "@mui/material/styles";

import Slider from 'react-slide-out';
import 'react-slide-out/lib/index.css';

import _ from 'lodash-es';

import { najdi_spojeni } from './compute.js'
import { jizdni_rad_z_delty, jizdni_rad_na_deltu } from './jr.js'

import { useGeolocated } from "react-geolocated";
import { MapProvider, Map, MouseControl, KeyboardControl, ZoomControl, Marker, MarkerLayer, BASE_LAYERS} from 'mapy-cz-react';

import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import CommentIcon from '@mui/icons-material/Comment';

const materialTheme = extendMaterialTheme();


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
  "Zdrávka": ["Zdravotnická škola", "Zámeček", "ERA - Zámeček"],
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

function typeToIcon(params, size = "medium") {
  if (params.value.startsWith('Autobus')) {
    return <Badge max={999} badgeContent={params.value.split(' ')[1]} color="primary"><DirectionsBusFilledTwoToneIcon fontSize={size} /></Badge>;
  } else if(params.value.startsWith('Vlak')) {
    if(params.value.split(' ')[1] !== undefined)
      return <Badge max={999} badgeContent={params.value.split(' ')[1]} color="primary"><TrainTwoToneIcon fontSize={size} /></Badge>;
    else
      return <TrainTwoToneIcon fontSize={size} />;
  } else if(params.value.startsWith('Trolejbus')) {
    return <Badge max={999} badgeContent={params.value.split(' ')[1]} color="primary"><DirectionsBusFilledTwoToneIcon fontSize={size} /></Badge>;
  }
}

//https://stackoverflow.com/questions/58095186/can-switches-have-multiple-labels
const DoubleLabeledSwitch = ({labelLeft, labelRight, collapsed, setCollapsed}) => {

  return (
    <Stack spacing={2} direction="row" component="label" alignItems="center" justifyContent="center">
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

function Spojeni() {

  const [dialog, setDialog] = useState({open: false, content: "", title: ""})
  const [sidebar, setSidebar] = useState({open: false, title: ""});
  const [searchParams, setSearchParams] = useState({time: dayjs(), start: "DELTA", dest: "Hradec Králové hl.n.", zDelty: true});

  const [result, setResult] = useState([]);
  const [markers, setMarkers] = useState()

  const handleClose = () => setDialog(prev => ({...prev, open: false}));

  const {
    coords,
    isGeolocationAvailable,
    isGeolocationEnabled
  } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  const normalCellRender = (params) => <Typography>{params.value}</Typography>
  const genericCell = {headerAlign: 'center', align: 'center', sortable: false, renderCell: normalCellRender}

  return (
  <div className="application">

  <div
    className="App"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}
  >

  <Modal
    open={dialog.open}
    onClose={handleClose}
    sx={{margin: 'auto'}}
    fullWidth={true}
  >
    <ModalDialog>
      <ModalClose />
      <DialogTitle>{ dialog.title }</DialogTitle>
      <DialogContent>
        { dialog.content }
      </DialogContent>
      <DialogActions>
        <Button variant="contained" disableElevation onClick={handleClose}>OK</Button>
      </DialogActions>
    </ModalDialog>
  </Modal>

  {
    !isGeolocationAvailable ? <font size="20rem" color="red">Geolokace není dostupná. Funkce budou omezeny.</font>
    : !isGeolocationEnabled ? <font size="20rem" color="red">Geolokace není povolená. Funkce budou omezeny.</font>
    : !coords ? <font size="20rem" color="red">Nelze získat pozici.</font>
    : <Slider
      title={sidebar.title}
      footer={
        <div style={{padding: '15px'}}>
          <Button variant="contained" onClick={() => setSidebar(prev => ({...prev, open: false}))}>Zavřít</Button>
        </div>
      }
      isOpen={sidebar.open}
      onOutsideClick={() => setSidebar(prev => ({...prev, open: false}))}
    >
    <Typography><center><p>Mapka</p></center></Typography>
    <MapProvider center={{lat: coords.latitude, lng: coords.longitude }} mapLayers={[BASE_LAYERS.TURIST_NEW]} zoom={16} >
      <Map height="100%">
        <MarkerLayer>
          <Marker enableCard={true} cardHeaderText="Moje pozice" coords={{ latitude: coords.latitude, longitude: coords.longitude }} />
          {markers}
        </MarkerLayer>
        <ZoomControl />
        <KeyboardControl />
        <MouseControl zoom pan wheel />
      </Map>
    </MapProvider>
    </Slider>
  }

  <Stack direction="column" spacing={2}>
  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
    <Autocomplete
      defaultValue="DELTA"
      options={searchParams.zDelty ? Object.keys(delta_stanice) : Object.keys(delta_prijezdy)}
      onChange={(event, value) => setSearchParams(prev => ({...prev, start: value}))}
      sx={{ width: 250 }}
      renderInput={(params) => <TextField {...params} label="Výchozí stanice" />}
    />
    <Autocomplete
      disablePortal
      disabled={!searchParams.zDelty}
      options={searchParams.zDelty ? Object.keys(delta_prijezdy) : Object.keys(delta_prijezdy)}
      defaultValue="Hradec Králové hl.n."
      onChange={(event, value) => setSearchParams(prev => ({...prev, dest: value}))}
      sx={{ width: 250 }}
      renderInput={(params) => <TextField {...params} label="Destinace" />}
    />

  </Stack>

    <Stack direction={{xs: 'column', sm: 'row'}} spacing={3.5}>
    <Stack direction="row" spacing={{xs: 0.3, md: 3}}>

    <MaterialCssVarsProvider theme={{ [THEME_ID]: materialTheme }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label="Čas odjezdu"
          value={searchParams.time}
          ampm={false}
          sx={{width: 120}}
          onChange={(newTime) => setSearchParams(prev => ({...prev, time: newTime}))}
        />
      </LocalizationProvider>
    </MaterialCssVarsProvider>

      <FormLabel control={<Checkbox disabled />} label="Zobrazit ceny" />

    </Stack>
      <DoubleLabeledSwitch
        labelLeft="Na Deltu"
        labelRight="Z Delty"
        collapsed={searchParams.zDelty}
        setCollapsed={() => setSearchParams(prev => ({...prev, zDelty: !prev.zDelty}))}
      />
    </Stack>

    <Button
      variant="solid"
      size="md"
      onClick={() =>
        najdi_spojeni(
          searchParams.zDelty ? delta_odjezdy : destinace_na_deltu,
          searchParams.start,
          !searchParams.zDelty ? "DELTA" : searchParams.dest,
          searchParams.time,
          searchParams.zDelty,
          {setDialog, setResult}
        )}
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

    <>
    <Card className="hello">
      <CardContent>
        <Typography><center><h4>{stanice}</h4></center></Typography>
      </CardContent>
      {
        cesty.filter(c => !_.isEmpty(c)).map(entry => 
          <Box>
            <Card>
              <CardActions onClick={() => {
                setSidebar(prev => ({...prev, open: true, title: [entry[1][0], entry[1][entry[1].length-1]].join(' - ')}))

                let jr_joined = {...jizdni_rad_z_delty, ...jizdni_rad_na_deltu}
                console.log(jizdni_rad_na_deltu)

                setMarkers(entry[1].map(k => {
                  if(typeof jr_joined[k] != 'string' && jr_joined[k] != undefined) {
                    return <Marker enableCard={true} cardHeaderText={k} coords={{ latitude: jr_joined[k].info.coords[0], longitude: jr_joined[k].info.coords[1] }} />
                  }
                }))
              }}>
                <CardContent>
                  <Typography>
                  {typeToIcon({value: entry[0][0]})}&nbsp;&nbsp;&nbsp;&nbsp;{entry[0][0]}
                    <List sx={{ width: '100%' }}>
                    {
                      [entry[1][0], entry[1][entry[1].length-1]].map((value) => {

                        return (
                          <ListItem
                            disablePadding
                          >
                            {value} {entry[0][1]} <font color="green">{entry[0][3]}</font>
                          </ListItem>
                        );
                      })
                    }
                    </List>
                  </Typography>
                </CardContent>
              </CardActions>
            </Card>
          </Box>
        )
      }
    </Card>

    </>

    ))
  }
  </Stack>

  </div>
  );
}

export default Spojeni;
