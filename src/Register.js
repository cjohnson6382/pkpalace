import React from 'react';
// import { Link } from 'react-router-dom'

import { registerUsername } from './utilities' // styles, 


const Register = () => {
	const submit = async e => {
		e.preventDefault()
		await registerUsername(e.target.name.value)
		this.props.location.push("/")
	}

	return (
		<form onSubmit={ submit } >
			<div>Choose a Username to Display on Your Posts</div>
			<input type="text" name="name" placeholder="What do we call you?" />
			<input type="submit" />
		</form>
	)
}

export default Register

/*
				<div style={ { ...styles.overlay, ...styles.display(this.state.show) } } >
					<div style={ styles.modal } >
						<div>
							<div><span style={ styles.label } >Username:</span><input name="email" type="text" /></div>
							<div><span style={ styles.label } >Password:</span><input name="password" type="text" /></div>
						</div>
						<div style={ styles.button } onClick={ this.submitRegister } >Register</div>
						<div style={ styles.button } onClick={ e => this.setState({ show: false }) } >Cancel</div>
					</div>
				</div>
*/