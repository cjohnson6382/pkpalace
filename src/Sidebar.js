import React from 'react';
import { Link } from 'react-router-dom'

import { styles, firebase } from './utilities'

// get all story names from the DB; organize by date and then by title

export default class Sidebar extends React.Component {
	state = { authenticated: false }

	componentWillMount () {
		let unsubscribe = firebase.auth().onAuthStateChanged(async user => {
			if (user) {
				this.setState({ authenticated: true })
				unsubscribe()
			}
			else {
				this.setState({ authenticated: false })
			}
		})
	}

	render () {
		let { authenticated } = this.state
		let { auth, posts, history } = this.props

		return (
			<div style={ styles.sidebar } >
				<div style={ { display: "flex", flexDirection: "column", padding: "0 0 1em 0" } } >
					{ authenticated && <Link style={ styles.button } to="/posts/new" >Create A Story</Link> }
					{ authenticated && <Link style={ styles.button } to="/posts/me" >View My Stories</Link> }
				</div>			
				<div style={ styles.boldText } >Stories</div>
				<div style={ styles.sidebarBanner } >Storytime kids; shut the fuck up</div>
				<div style={ { padding: "0.5em 0.3em 0 0.3em", display: "flex", flexDirection: "column" } } >
					{ posts.map((p, i) => (
						<Link key={ i } style={ styles.sidebarText } to={ `/story/${p.id}` } >{ p.name }</Link>
					)) }
				</div>
				<div style={ { padding: "2em 0 2em 0" } } >
					{ !authenticated && <Link to="/login" ><div style={ styles.button } >Login</div></Link> }
					{ authenticated && <div style={ styles.button } onClick={ e => auth.logout() } >Logout</div> }
				</div>
			</div>
		)
	}
}