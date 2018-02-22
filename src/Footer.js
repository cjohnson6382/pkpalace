import React from 'react'

import { styles } from './utilities'

import { copyright, demoFooter } from './content'

const Footer = () => (
	<div style={ { ...styles.wide, fontSize: "65%" } } >
		<div style={ { ...styles.fourHigh, ...styles.centeredJustified } } >
			{ demoFooter }
		</div>
		<div style={ styles.fourHigh } >{ copyright }</div>
	</div>
)

export default Footer