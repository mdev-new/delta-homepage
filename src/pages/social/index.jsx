import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import {
	TextField,
	Stack,
	Card,
	CardActionArea, 
    CardActions, 
    CardContent, 
    CardMedia, 
} from '@mui/material'

function Social({user}) {
	return (
		<Box>
			{ user &&
				<Box>
					<Card sx={{width: 300, height: 300}}>
						<CardContent>
							<TextField label="Text příspěvku" variant="outlined" />
						</CardContent>
						<CardActions>
							<Button variant="contained">Šérnout</Button>
						</CardActions>
					</Card>
				</Box>
			}

			<Stack direction="column">
				{/*<Card>{content}</Card>*/}
			</Stack>
		</Box>
	);
}

export default Social;