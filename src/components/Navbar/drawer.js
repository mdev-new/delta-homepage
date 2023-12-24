import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';

import { NavLink as Link } from 'react-router-dom'

export default <div>
					<List>
					{
						[['Spojení', '/zdd'], ['Helpdesk', '/helpdesk'], ['Social', '/social'], ['Moodle', '/moodle'], ['Mount Blue', '/mb'], ['TopGun', '/topgun'], ['Účet', '/account']].map(([text, val]) => (
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