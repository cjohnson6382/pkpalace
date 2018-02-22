import React from 'react'
import { Link } from 'react-router-dom'

import { styles } from './utilities'

const Summary = ({ story, id }) => (
	<div style={ styles.bodyContent } >
		<div style={ styles.summaryContainer } >{ story }</div>
		<Link style={ { textDecoration: "none", color: "#bebfbd"} } to={ `/story/${id}` }>Tell Me More, Daddy...</Link>
	</div>
)

export default Summary