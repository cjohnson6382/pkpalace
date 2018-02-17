import React from 'react';
import { Link } from 'react-router-dom'

import { styles } from './utilities'

import { bannerMessage } from './content'

const Header = () => (
	<Link to="/" style={ { ...styles.paddingTwo, cursor: "pointer", textDecoration: "none", color: "black" } } >
		<h2 style={ styles.title } >Archives of the Pk Palace: Nothing Lasts Forever</h2>
		<div style={ styles.boldText } >{ bannerMessage }</div>
	</Link>
)

export default Header