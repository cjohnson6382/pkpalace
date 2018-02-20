import React from 'react'
// import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

// import { styles, db } from './utilities'

const localStyles = {
	storyContainer: {
		backgroundColor: "white"
	},
	storyImageContainer: {
		width: "100%"
	},
	storyImage: {
		width: "90%"
	},
	storyCaption: {
		fontSize: "50%",
		padding: "0 0 1em 0"
	},
	storyText: {
		padding: "0 0 1em 0"
	},
	storyName: {
		fontWeight: "bold",
		fontSize: "125%",
		padding: "0.5em 0 0.5em 0"
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
		let { story } = this.props

		return (
			<div style={ localStyles.storyContainer } >
				<div style={ localStyles.storyName } >{ story ? story.name : "" }</div>
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