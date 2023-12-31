import {
	Header,
	HeaderContainer,
	HeaderName,
	HeaderNavigation,
	HeaderMenuButton,
	HeaderMenuItem,
	HeaderGlobalBar,
	HeaderGlobalAction,
	SkipToContent,
	SideNav,
	SideNavItems,
	HeaderSideNavItems,
} from '@carbon/react';

import "./header.scss";

const HeaderComponent = () => (
	<HeaderContainer
		render={({ isSideNavExpanded, onClickSideNavExpand }) => (
			<Header aria-label="Carbon Tutorial">
				<SkipToContent />
				<HeaderMenuButton
					aria-label="Open menu"
					onClick={onClickSideNavExpand}
					isActive={isSideNavExpanded}
				/>
				<HeaderName href="/" prefix="IBM">
					Delta Homepage
				</HeaderName>
				<HeaderNavigation aria-label="Carbon Tutorial">
					<HeaderMenuItem href="/repos">Repositories</HeaderMenuItem>
				</HeaderNavigation>
				<HeaderGlobalBar />
			</Header>
		)}
	/>
);

export default HeaderComponent;