import React from 'react'

import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
// import { styles } from './utilities'

const googleSignInBadge = './google.png'

// const styles = {
// 	button: {
// 		textDecoration: "none",
// 		fontWeight: "bold",
// 		fontSize: "125%",
// 		marginTop: "0.3em",
// 		padding: "0.2em",
// 		width: "50%",
// 		color: "white",
// 		backgroundColor: "cornflowerblue"
// 	},
// 	label: {
// 		fontSize: "125%",
// 		fontWeight: "bold",
// 		paddingRight: "0.4em"
// 	},
// 	overlay: {
// 		backgroundColor: "rgba(0, 0, 0, 0.5)",
// 		position: "absolute",
// 		display: "flex",
// 		justifyContent: "center",
// 		alignItems: "center",
// 		width: "85%",
// 		height: "40%"
// 	},
// 	modal: {
// 		padding: "1em",
// 		width: "50%",
// 		margin: "1em",
// 		border: "0.1em solid darkgrey",
// 		boxShadow: "0.1em 0.1em 0.1em 0.1em darkgrey",
// 		backgroundColor: "white",
// 		display: "flex",
// 		flexDirection: "column",
// 		alignItems: "center",
// 		justifyContent: "center"
// 	},
// 	link: {
// 		textDecoration: "none",
// 		color: "cornflowerblue",
// 		cursor: "pointer"	
// 	},
// 	display: bool => ({ display: bool ? "flex" : "none" })
// }

export default class Login extends React.Component {
	static propTypes = { auth: PropTypes.object }

	constructor (props) {
		super(props)

		// this.unPwSubmit = this.unPwSubmit.bind(this)
		this.register = this.register.bind(this)
	}

	state = { show: false }

	// unPwSubmit (e) {
	// 	e.preventDefault()
	// 	let { email, password } = e.target
	// 	// console.log(username.value, password.value)
	// 	this.props.auth.usernamePasswordLogin(email.value, password.value)
	// }

	register (e) {
		console.log("showing registration overlay")
		this.setState({ show: true })
	}

	// submitRegister (e) {
	// 	e.preventDefault()
	// 	let { email, password } = e.target
	// 	this.props.auth.register(email.value, password.value)
	// 	this.setState({ show: false })
	// 	this.props.history.push("/register")
	// }

	/*
				<form style={ { padding: "0.3em" } } onSubmit={ e => this.unPwSubmit(e) } >
					<div><span style={ styles.label } >Username:</span><input name="email" type="text" /></div>
					<div><span style={ styles.label } >Password:</span><input name="password" type="text" /></div>
					<button style={ styles.button } >Sign In</button>
				</form>

src={ googleSignInBadge } 							
	*/

	render () {
		return (
			<div style={ { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" } } >
				<div style={ { padding: "0.3em" } } >
					<span style={ { paddingRight: "0.2em" } } >Don't have an account?</span>
					<span onClick={ this.register } >
						Register
					</span>
				</div>
				<div onClick={ e => this.props.auth.providerLogin("google") } ><img alt="Google Login" src={ googleSignInBadge } /></div>
				<div onClick={ e => this.props.auth.providerLogin("facebook") } ><img alt="Facebook Login" /></div>
			</div>
		)
	}
}
