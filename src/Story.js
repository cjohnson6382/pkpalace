import React from 'react'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

// import {  db } from './utilities'

import { styles, firebase } from './utilities'

const localStyles = {
	storyContainer: {
		backgroundColor: "rgba(71, 55, 62, 0.2)"
	},
	storyImageContainer: {
		width: "100%"
	},
	storyImage: {
		width: "90%"
	},
	storyCaption: {
		fontSize: "80%",
		padding: "0 0 1em 0",
		color: "#bebfbd"
	},
	storyText: {
		padding: "0 0 1em 0",
		color: "#bebfbd"
	},
	storyName: {
		fontWeight: "bold",
		fontSize: "125%",
		padding: "0.5em 0 0.5em 0",
		color: "#bebfbd",
		flex: "10 1 auto"
	},
	storyBlock: {
		width: "100%"
	}
}

export default class Story extends React.Component {
	// static propTypes = { story: PropTypes.object }

	// state = { story: { body: [] } }

	// async componentWillMount () {
	// 	let story = (await db.collection("stories").doc(this.props.match.params.id).get()).data()
	// 	this.setState({ story })
	// }

	render () {
		let { story, id } = this.props

		return (
			<div style={ localStyles.storyContainer } >
				<div style={ { display: "flex", flexDirection: "row", alignItems: "center" } } >
					<div style={ localStyles.storyName } >{ story ? story.name : "" }</div>
					{ firebase.auth().currentUser && firebase.auth().currentUser.uid === story.user && <Link to={ `/edit/${id}` } style={ { ...styles.button, width: "10%" } } >Edit</Link> }
				</div>
				{ story.body.map((block, i) => (
					<div key={ i } style={ localStyles.storyBlock } >
						<div style={ localStyles.storyImageContainer } name={ block.id } >
							<img style={ localStyles.storyImage } src={ block.image } alt={ block.id } />
						</div>
						<div style={ localStyles.storyCaption } >{ block.caption }</div>
						<div style={ localStyles.storyText } >{ block.text }</div>
					</div>
				)) }
			</div>
		)
	}
}