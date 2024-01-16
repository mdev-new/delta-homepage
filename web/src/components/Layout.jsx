import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';

function Root(props) {
	return (
		<Box
			{...props}
			sx={[
				{
					bgcolor: 'background.appBody',
					minHeight: '100vh',
				},
				...(Array.isArray(props.sx) ? props.sx : [props.sx]),
			]}
		/>
	);
}

function Header(props) {
	return (
		<Box
			component="header"
			className="Header"
			{...props}
			sx={[
				{
					p: 2,
					gap: 2,
					bgcolor: 'background.surface',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					gridColumn: '1 / -1',
					borderBottom: '1px solid',
					borderColor: 'divider',
					position: 'sticky',
					top: 0,
					zIndex: 1100,
				},
				...(Array.isArray(props.sx) ? props.sx : [props.sx]),
			]}
		/>
	);
}

function SideNav(props) {
	return (
		<Box
			component="nav"
			className="Navigation"
			{...props}
			sx={[
				{
					p: 2,
					bgcolor: 'background.surface',
					borderRight: '1px solid',
					borderColor: 'divider',
					display: {
						xs: 'none',
						sm: 'initial',
					},
				},
				...(Array.isArray(props.sx) ? props.sx : [props.sx]),
			]}
		/>
	);
}

function Main(props) {
	return (
		<Box
			component="main"
			className="Main"
			{...props}
			sx={[{ p: 2 }, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}
		/>
	);
}

function Footer(props) {
	return (
		<Box
			component="footer"
			className="Footer"
			{...props}
			sx={[{ p: 2 }, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}
		/>
	);
}

export default {
	Root,
	Header,
	SideNav,
	Main,
	Footer
};
