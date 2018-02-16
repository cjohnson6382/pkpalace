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
		let { auth, posts } = this.props

		return (
			<div style={ styles.sidebar } >
				<div style={ styles.boldText } >Stories</div>
				<div style={ styles.sidebarBanner } >It's storytime kids; shut the fuck up</div>
				<div style={ { display: "flex", flexDirection: "column" } } >
					{ authenticated && <Link style={ styles.button } to="/posts/new" >Create A Story</Link> }
					{ authenticated && <Link style={ styles.button } to="/posts/me" >View My Stories</Link> }
				</div>
				<div style={ { paddingLeft: "0.3em" } } >
					{ posts.map(p => (
						<Link to={ `/detail/${p.id}` } >{ p.title }</Link>
					)) }
				</div>
				<div style={ { padding: "2em 0 2em 0" } } >
					{ !authenticated && <Link style={ styles.button } to="/login" >Login</Link> }
					{ authenticated && <div style={ styles.button } onClick={ e => auth.logout() } >Logout</div> }
				</div>
			</div>
		)
	}
}

// const Sidebar = ({ posts, auth }) => {

// 	return (
// 		<div style={ styles.sidebar } >
// 			<div style={ styles.boldText } >Stories</div>
// 			<div style={ styles.sidebarBanner } >It's storytime kids; shut the fuck up</div>
// 			<div style={ { display: "flex", flexDirection: "column" } } >
// 				{ auth.isAuthenticated() && <Link to="/posts/new" >Create Story</Link> }
// 				{ auth.isAuthenticated() && <Link to="/posts/me" >View My Posts</Link> }
// 			</div>
// 			<div style={ { paddingLeft: "0.3em" } } >
// 				{ posts.map(p => (
// 					<Link to={ `/detail/${p.id}` } >{ p.title }</Link>
// 				)) }
// 			</div>
// 			{ !auth.isAuthenticated() && <Link to="/login" >Login</Link> }
// 		</div>
// 	)
// }

// export default Sidebar