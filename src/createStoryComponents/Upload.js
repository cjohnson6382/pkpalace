import React from 'react';
// import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

import { styles } from '../utilities'

const Upload = ({ change, next }) => (
	<div style={ { display: "flex", flexDirection: "column", backgroundColor: "rgba(0, 0, 0, 0.3)", color: "#bebfbd" } } >
		<div style={ styles.paddingTwo } >
			<div style={ { ...styles.boldText, ...styles.paddingTwo } } >Choose Some Pictures to Upload</div>
			<input style={ { ...styles.paddingTwo, width: "100%", height: "100%" } } type="file" multiple accept="image/*" onChange={ change } />
			<div style={ { ...styles.button, width: "40%" } } onClick={ next } >Done</div>
		</div>
	</div>
)

export default Upload