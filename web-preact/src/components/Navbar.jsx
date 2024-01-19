import * as React from 'react';
import Chip from '@mui/joy/Chip';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';

import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';

export default function Navigation({items}) {
	return (
	<List>
		{items.map(r => r[0] != 'divider' &&
			<a key={r[1]} style={{all: 'unset'}} href={r[1]}>
				<ListItem selected>
					<ListItemButton>
						<ListItemContent>{r[0]}</ListItemContent>
					</ListItemButton>
				</ListItem>
			</a>
		)}
	</List>
	);
}
