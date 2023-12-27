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

import {
	useState,
	useEffect
} from 'react'

// pokud je dany clovek IT admin nebo reditelstvi
// tak umoznit odstraneni prispevku
// checkovano na serveru samozrejme

// todo fetch
// todo barva radky podle toho jestli vyreseno nebo ne
const rows = [
	{zavada: 'nefunkcni wc', misto: '2. patro'}
]

function Helpdesk({auth}) {

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch("http://localhost:8080/api/v1/helpdesk/posts", {
			method:"GET", 
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"Access-Control-Allow-Credentials": true,
			},
		})
		.then((response) => response.json())
		.then((res) => {
			setPosts(res);
		})
		.catch((err) => {
			console.log(err);
		});
	}, []);

	return (
		<Box>
		{
			auth &&
			<form method="POST" action="http://localhost:8080/api/v1/helpdesk/post">
				<Stack direction="row">
					<TextField name="problem" label="Závada" variant="outlined" />
					<TextField name="place" label="Místo" variant="outlined" />
					<Button type="submit" variant="contained">Přidat</Button>
				</Stack>
			</form>
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
						{posts.map((post) => (
							<TableRow
								key={post.problem}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{post.problem}
								</TableCell>
								<TableCell align="right">{post.place}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}

export default Helpdesk;