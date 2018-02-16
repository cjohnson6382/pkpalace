import React from 'react'

import Summary from './Summary'
import Title from './Title'

import { styles, db, firebase } from './utilities'
// import { demoPostTitle, demoPostContent } from './content'

export default class MyPosts extends React.Component {
	state = { posts: [] }

	async componentWillMount () {
		this.setState({ loading: true })
		let posts = await db.collection("posts").where("user", "==", firebase.auth().currentUser.uid).get()

		posts = posts.length ? posts.map(p => p.data()) : []
		console.log(posts)
		this.setState({ posts: posts, loading: false })
	}

	render () {
		let { posts, loading } = this.state

		return (
			<div style={ styles.whiteBackground } >
				{ loading === false && posts.length < 1 && 
					<div style={ styles.paddingTwo } >
						The story is that you haven't written any, asshole
					</div>
				}
				{ posts.map(p => (
					<div>
						<Title title={ p.title } />
						<Summary content={ p.content } id={ p.id } />	
					</div>
				)) }
			</div>
		)
	}
}