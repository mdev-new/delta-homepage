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
	Paper,
	Typography
} from '@mui/material'

import {
	FormControl,
	InputLabel,
	Select,
	MenuItem
} from '@mui/material'

import {
	useState,
	useEffect
} from 'react'

// pokud je dany clovek IT admin nebo reditelstvi
// tak umoznit odstraneni prispevku
// checkovano na serveru samozrejme

function Helpdesk({user}) {

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

	const solvedStyle = {backgroundColor: 'green', color: 'white'};
	const workStyle = {backgroundColor: 'yellow', color: 'black'};
	const unsolvedStyle = {backgroundColor: 'white', color: 'black'};

	return (
		<Box>
		{
			user &&
			<form method="POST" action={process.env.REACT_APP_API_ADDR + "/api/v1/helpdesk/post"}>
				<Stack direction="row">
					<TextField name="problem" label="Závada" variant="outlined" />
					<TextField name="place" label="Místo" variant="outlined" />
					<TextField name="assignee" label="Přiřazená osoba (e-mail)" variant="outlined" />
					<FormControl sx={{width: 120}}>
						<InputLabel>Typ závady</InputLabel>
						<Select
							label="Typ závady"
							name="type"
						>
							<MenuItem value="hw">Hardware</MenuItem>
							<MenuItem value="sw">Software</MenuItem>
							<MenuItem value="other">Ostatní</MenuItem>
						</Select>
					</FormControl>
					<Button type="submit" variant="contained">Přidat</Button>
				</Stack>
			</form>
		}

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell><b>Závada</b></TableCell>
							<TableCell><b>Typ závady</b></TableCell>
							<TableCell><b>Místo</b></TableCell>
							<TableCell><b>Datum a čas</b></TableCell>
							<TableCell><b>Přiřazená osoba</b></TableCell>
							<TableCell><b>Nahlásil</b></TableCell>
							<TableCell><b>Souhlasí</b></TableCell>
							<TableCell align="right" />
						</TableRow>
					</TableHead>
					<TableBody>
						{posts.map((post) => {
							const s = (post.status == "solved") ? solvedStyle : (post.status == "work") ? workStyle : unsolvedStyle;
							return (
							<TableRow
								key={post.problem}
							>
								<TableCell sx={s}><Typography>{post.problem}</Typography></TableCell>
								<TableCell sx={s}><Typography>{post.type}</Typography></TableCell>
								<TableCell sx={s}><Typography>{post.place}</Typography></TableCell>
								<TableCell sx={s}><Typography>{post.datetime.split('GMT')[0]}</Typography></TableCell>
								<TableCell sx={s}><Typography>{post.assigned}</Typography></TableCell>
								<TableCell sx={s}><Typography>{post.reporter.split('@')[0]}</Typography></TableCell>
								<TableCell sx={s}><Typography>{post.liked_by.map(l => l.split('@')[0]).join(', ')}</Typography></TableCell>
								<TableCell sx={s} align="right">
								{post.status != 'solved' && user &&
									<>
									<form method="POST" action={process.env.REACT_APP_API_ADDR + "/api/v1/helpdesk/update"}>
										<Button type='submit' variant='outlined' name='action' value={`{"variant": "souhlas", "id": "${post._id}"}`}>Souhlasit</Button>
										{user.role != 'student' && <>
										<Button type='submit' variant='outlined' name='action' value={`{"variant": "prace", "id": "${post._id}"}`}>Pracuje se na tom</Button>
										<Button type='submit' variant='outlined' name='action' value={`{"variant": "vyreseno", "id": "${post._id}"}`}>Vyřešeno</Button>
										</>
										}
									</form>
									{ user && user.role != 'student' &&
									<form method="POST" action={process.env.REACT_APP_API_ADDR + "/api/v1/helpdesk/delete?_method=DELETE"}>
										<Button type='submit' variant='outlined' name='id' value={`${post._id}`}>Smazat</Button>
									</form>
									}
									</>
								}
								</TableCell>
							</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}

export default Helpdesk;