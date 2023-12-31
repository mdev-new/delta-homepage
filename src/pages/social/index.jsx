import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';

import {
	TextField,
	Stack,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	CardHeader,
	Typography
} from '@mui/material'

import {
	useState,
	useEffect
} from 'react';

function Social({user}) {

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch(process.env.REACT_APP_API_ADDR + "/api/v1/social/posts", {
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

	return (
		<Box>
			{ user &&
				<Box>
					<Card sx={{width: 700, minHeight: 150, margin: 'auto'}}>
						<form method="POST" action={process.env.REACT_APP_API_ADDR + "/api/v1/social/post"}>
							<CardContent>
								<TextField
									label="Text příspěvku"
									multiline
									variant="standard"
									name="text"
									sx={{width: '100%', margin: 'auto'}}
								/>
							</CardContent>
							<CardActions>
								<Button sx={{marginLeft: 'auto'}} variant="contained" type="submit">Šérnout</Button>
							</CardActions>
						</form>
					</Card>
				</Box>
			}
			<br />

			<Stack direction="column" alignItems="center">
				{posts.map(post =>
					<Box>
						<Card sx={{width: 700, minHeight: 20}}>
							<CardHeader
								avatar={<AccountCircle />}
								title={post.poster}
								subheader={`${post.datetime} • ${0} to se mi líbí`}
							/>
							<CardContent>
								<Typography>{post.text}</Typography>
							</CardContent>
							<CardActions>
							<Button variant="outlined">Zobrazit odpovědi</Button>
							{user &&
								<Button variant="outlined">To se mi líbí</Button>
							}
							</CardActions>
						</Card>
						<br />
					</Box>
				)}
			</Stack>
		</Box>
	);
}

export default Social;