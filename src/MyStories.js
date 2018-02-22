import React from 'react'

import { Link } from 'react-router-dom'

import Summary from './Summary'
import Title from './Title'

import { styles, db, firebase } from './utilities'

export default class MyPosts extends React.Component {
	state = { posts: [] }

	async componentWillMount () {
		this.setState({ loading: true })
		let pp = await db.collection("stories").where("user", "==", firebase.auth().currentUser.uid).get()
		let posts = []

		pp.forEach(p => {
			console.log(p.data())
			posts.push(p.data())
		})

		console.log(posts)

		this.setState({ posts: posts, loading: false })
	}

	render () {
		let { posts, loading } = this.state

		return (
			<div style={ styles.whiteBackground } >
				{ loading === false && posts.length < 1 && 
					<div style={ { ...styles.paddingTwo, fontWeight: "bold" } } >
						The story is that you haven't written any, asshole
					</div>
				}
				{ posts.map(p => (
					<div>
						<Link style={ { width: "30%", padding: "0 1em 0 0 " } } to={ `/story/${p.id}` }><img style={ { width: "100%", height: "100%" } } src={ p.body[0].image } alt={ p.body[0].id } /></Link>
						<div>
							<Title title={ p.name } />
							{ p.body.filter(b => b.text).length > 0 && <Summary story={ p.body.map(b => b.text).slice(1, 3).join(".") } id={ p.id } /> }
							{ p.body.filter(b => b.text).length < 1 && <Summary story="This is a picture story" id={ p.id } /> }
						</div>
					</div>
				)) }
			</div>
		)
	}
}