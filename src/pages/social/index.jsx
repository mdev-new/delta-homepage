import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import NotesIcon from '@mui/icons-material/Notes';
import SendIcon from '@mui/icons-material/Send';

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

	const [showResponse, setShowResponse] = useState(false);

	useEffect(() => {
		fetch(process.env.REACT_APP_API_ADDR + "/api/v1/social/posts", {
			method:"GET", 
			credentials: "include"
		})
		.then((response) => response.json())
		.then((res) => {
			setPosts(res.reverse());
		})
		.catch((err) => {
			console.log(err);
		});
	}, []);

	const like = (p) => fetch(process.env.REACT_APP_API_ADDR + `/api/v1/social/posts/${p}/like?_method=PUT`, {
		method:"POST",
		credentials: "include"
	})

	const del = (p) => fetch(process.env.REACT_APP_API_ADDR + `/api/v1/social/posts/${p}?_method=DELETE`, {
		method:"POST",
		credentials: "include"
	})

	return (
		<Box>
			{ user &&
				<Box>
					<Card sx={{width: 550, minHeight: 65, margin: 'auto', position: 'relative'}}>
						<form method="POST" action={process.env.REACT_APP_API_ADDR + "/api/v1/social/post"}>
							<CardContent sx={{display: 'inline'}}>
								<TextField
									label="Text příspěvku"
									multiline
									variant="standard"
									name="text"
									sx={{width: '75%', margin: 'auto'}}
								/>
							</CardContent>
							<CardActions sx={{display: 'inline', position: 'absolute', bottom: 0, right: '5%'}}>
								<IconButton variant="contained" type="submit"><SendIcon /></IconButton>
							</CardActions>
						</form>
					</Card>
				</Box>
			}
			<br />

			<Stack direction="column" alignItems="center">
				{posts.map(post =>
					<Box key={post._id}>
						<Card sx={{width: 700, minHeight: 20}}>
							<CardHeader
								avatar={<AccountCircle />}
								title={post.poster}
								subheader={`${post.datetime} • ${post.likes.length} to se mi líbí`}
							/>
							<CardContent>
								<Typography>{post.text}</Typography>
							</CardContent>
							<CardActions>
							{user && <>
								<IconButton onClick={() => like(post._id)}><ThumbUpIcon /></IconButton>
								<IconButton onClick={() => setShowResponse(true)}><NotesIcon /></IconButton>
								</>
							}
							<IconButton><CommentIcon /></IconButton>
							{ user.email === post.poster && <>
								<IconButton><EditIcon /></IconButton>
								<IconButton color="error"><DeleteIcon /></IconButton>
								</>
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
