import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';

import {
	TextField,
	Stack,
} from '@mui/material'

function Social() {
	return (
		<Box>
			<Box>
				<Card sx={{width: 300, height: 300}}>
					<CardContent>
						<TextField label="Text příspěvku" variant="outlined" />
					</CardContent>
					<CardActionArea>
						<Button variant="contained">Šérnout</Button>
					</CardActionArea>
				</Card>
			</Box>

			<Stack direction="column">
				{/*<Card>{content}</Card>*/}
			</Stack>
		</Box>
	);
}

export default Social;