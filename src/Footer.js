import React from 'react'

import { styles } from './utilities'

import { demoFooter } from './content'

const Footer = () => (
	<div style={ styles.wide } >
		<div style={ { ...styles.fourHigh, ...styles.centeredJustified } } >
			{ demoFooter }
		</div>
	</div>
)

export default Footer