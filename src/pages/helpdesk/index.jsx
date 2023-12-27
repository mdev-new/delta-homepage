import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import $ from 'jquery';

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
		fetch(process.env.REACT_APP_API_ADDR + "/api/v1/helpdesk/posts", {
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
			setPosts(res.reverse());
		})
		.catch((err) => {
			console.log(err);
		});
	}, []);

	const submit = (what) => $.ajax({
		type: "POST",
		url: process.env.REACT_APP_API_ADDR + "/api/v1/helpdesk/update",
		data: what,
		xhrFields: { withCredentials:true },
		statusCode: {
			401: () => {
				alert("401 Unauthorized");
			}
  		}
	});

	return (
		<Box>
		{
			auth &&
			<form onSubmit={(e) => e.stopPropagation()} method="POST" action={process.env.REACT_APP_API_ADDR + "/api/v1/helpdesk/post"}>
				<Stack direction="row">
					<TextField name="problem" label="Závada" variant="outlined" />
					<TextField name="place" label="Místo" variant="outlined" />
					<TextField name="assignee" label="Přiřazená osoba (e-mail)" variant="outlined" />
					<Button type="submit" variant="contained">Přidat</Button>
				</Stack>
			</form>
		}

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell><b>Závada</b></TableCell>
							<TableCell><b>Místo</b></TableCell>
							<TableCell><b>Datum a čas</b></TableCell>
							<TableCell><b>Přiřazená osoba</b></TableCell>
							<TableCell><b>Nahlásil</b></TableCell>
							<TableCell><b>Souhlasí</b></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{posts.map((post) => (
							<TableRow
								key={post.problem}
								sx={post.solved && {backgroundColor: 'green', color: 'white'}}
							>
								<TableCell sx={post.solved && {color: 'white'}}>{post.problem}</TableCell>
								<TableCell sx={post.solved && {color: 'white'}}>{post.place}</TableCell>
								<TableCell sx={post.solved && {color: 'white'}}>{post.datetime.split('GMT')[0]}</TableCell>
								<TableCell sx={post.solved && {color: 'white'}}>{post.assigned}</TableCell>
								<TableCell sx={post.solved && {color: 'white'}}>{post.reporter.split('@')[0]}</TableCell>
								<TableCell sx={post.solved && {color: 'white'}}>{post.liked_by.map(l => l.split('@')[0]).join(', ')}</TableCell>
								{!post.solved &&
									<TableCell>
										<Button variant='outlined' onClick={() => submit({variant: 'souhlas', id: post._id})}>Souhlasit</Button>
										<Button variant='outlined' onClick={() => submit({variant: 'vyreseno', id: post._id})}>Vyřešeno</Button>
									</TableCell>
								}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}

export default Helpdesk;