
import { DataGrid } from '@mui/x-data-grid';
import { useCollectionData } from 'react-firebase-hooks/firestore'

import {useEffect} from 'react'

import {
  Button,
  Typography,
  Stack
} from '@mui/joy';

import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as extendMaterialTheme,
  THEME_ID
} from "@mui/material/styles";

const materialTheme = extendMaterialTheme();

const columns = [
  { field: 'id', headerName: 'ID', type: 'string', width: 180 },
  { field: 'name', headerName: 'Jmeno', type: 'string', editable: true, width: 150 },
  { field: 'surname', headerName: 'Prijmeni', type: 'string', editable: true, width: 150 },
  { field: 'email', headerName: 'E-Mail', type: 'string', editable: false, width: 250 },
  { field: 'lastLogin', headerName: 'Posledni prihlaseni', editable: false, width: 150 },
  { field: 'bk_user', headerName: 'Uziv. jm. Bak.', type: 'string', editable: true, width: 150 },
  { field: 'intr', headerName: 'Intr', editable: true, type: 'boolean', width: 150 },
  { field: 'typing_lesson', headerName: 'Psaci cvic.', type: 'number', editable: true, width: 150 },
  { field: 'typing_finished', headerName: 'Psani dokonc.', type: 'boolean', editable: true, width: 150 },
]

export default function Admin({user, firestore}) {

  const usersCollection = firestore.collection('users')
  const [users] = useCollectionData(usersCollection, {idField: 'id'})

  const lessonsCollection = firestore.collection('typing_lessons')
  const [lessons] = useCollectionData(lessonsCollection, {idField: 'id'})

  const saveRow = (row) => {
    const id = row.id

    firestore.collection('users').doc(id).update(row).then(() => console.log('saved'))
  }

  return (
  <>
    <MaterialCssVarsProvider theme={{ [THEME_ID]: materialTheme }}>
      <DataGrid
        disableRowSelectionOnClick
        columns={columns}
        rows={users || []}
        processRowUpdate={(updated, original) =>
          saveRow(updated)
        }
      />
    </MaterialCssVarsProvider>
    <Button>
      Nové cvičení
    </Button>
    { lessons && lessons.map(l =>
      <details>
        <summary>{l.id}</summary>
        <Typography>Text: {l.text}</Typography>
        <Stack spacing={1} direction="row">
          <Button>Upravit</Button>
          <Button>Smazat</Button>
        </Stack>
      </details>
      )
    }
  </>
  );
}
