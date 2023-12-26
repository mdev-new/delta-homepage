import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';

import { NavLink as Link } from 'react-router-dom'

export default function Drawer({auth, routes}) {
	return (<div>
				<List>
				{
					routes.map(([text, val, perm]) => (
						perm &&
						<ListItem key={text} disablePadding>
							<Link to={val}>
								<ListItemButton>
									<ListItemText primary={text} />
								</ListItemButton>
							</Link>
						</ListItem>
					))
				}
				</List>
			</div>
	);
}