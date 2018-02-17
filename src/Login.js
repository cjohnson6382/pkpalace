import React from 'react'

import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
// import { styles } from './utilities'

const googleSignInBadge = './google.png'

export default class Login extends React.Component {
	static propTypes = { auth: PropTypes.object }

	constructor (props) {
		super(props)

		this.register = this.register.bind(this)
	}

	state = { show: false }

	register (e) {
		console.log("showing registration overlay")
		this.setState({ show: true })
	}

	// <div onClick={ e => this.props.auth.providerLogin("facebook") } ><img alt="Facebook Login" /></div>
	/*
	<div style={ { padding: "0.3em" } } >
		<span style={ { paddingRight: "0.2em" } } >Don't have an account?</span>
		<span onClick={ this.register } >
			Register
		</span>
	</div>
	*/
	render () {
		return (
			<div style={ { 
				display: "flex", 
				flexDirection: "column", 
				justifyContent: "center", 
				alignItems: "center", 
				padding: "1em", 
				backgroundColor: "white" 
			} } >
				<div onClick={ e => this.props.auth.providerLogin("google") } >
					<img alt="Google Login" src={ googleSignInBadge } />
				</div>
			</div>
		)
	}
}
