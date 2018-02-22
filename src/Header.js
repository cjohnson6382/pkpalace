import React from 'react';
import { Link } from 'react-router-dom'

import { styles } from './utilities'

import siteLogo from './site-logo.gif'

import { bannerMessage, siteTitle } from './content'

const Header = () => (
	<Link to="/" style={ { width: "100%", cursor: "pointer", textDecoration: "none", color: "#bebfbd", background: "black", display: "flex", flexDirection: "row", padding: "0 0 1em 0", alignItems: "center", justifyContent: "center" } } >
		<div style={ { width: "15%", display: "flex", alignItems: "center", justifyContent: "center" } } ><img style={ { padding: "0 1em 0 0", height: "100%" } } src={ siteLogo } alt="PkP logo" /></div>
		<div style={ { width: "85%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "radial-gradient(#47373e, black)" } } >
			<h2 style={ styles.title } >{ siteTitle }</h2>
			<div style={ styles.boldText } >{ bannerMessage }</div>
		</div>
	</Link>
)

export default Header