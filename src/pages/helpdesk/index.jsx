import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import {
	TextField,
	Stack,
} from '@mui/material'

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper
} from '@mui/material'

// pokud je dany clovek IT admin nebo reditelstvi
// tak umoznit odstraneni prispevku
// checkovano na serveru samozrejme

// todo fetch
// todo barva radky podle toho jestli vyreseno nebo ne
const rows = [
	{zavada: 'nefunkcni wc', misto: '2. patro'}
]

function Helpdesk({auth}) {
	return (
		<Box>
		{
			auth?
			<Stack direction="row">
				<TextField label="Závada" variant="outlined" />
				<TextField label="Místo" variant="outlined" />
				<Button variant="contained">Přidat</Button>
			</Stack>

			: <></>
		}

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Závada</TableCell>
							<TableCell align="right">Místo</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow
								key={row.zavada}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{row.zavada}
								</TableCell>
								<TableCell align="right">{row.misto}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}

export default Helpdesk;