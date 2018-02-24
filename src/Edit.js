import React from 'react';
// import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

import { styles, firebase, db } from './utilities'

import Compose from './createStoryComponents/Compose'

const localStyles = {
	fatButton: {
		fontSize: "125%", 
		width: "40%", 
		padding: "2em"
	},
	outerOverlay: { 
		top: 0, 
		left: 0, 
		width: "100%", 
		alignSelf: "flex-start", 
		alignItems: "center", 
		justifyContent: "center", 
		height: "100%", 
		position: "fixed", 
		display: "flex", 
		flexDirection: "column", 
		backgroundColor: "rgba(0, 0, 0, 0.3)" 
	},
	innerOverlay: { 
		backgroundColor: "rgba(255, 0, 0, 0.7)", 
		fontSize: "150%", 
		color: "#bebfbd", 
		padding: "2em", 
		width: "40%", 
		margin: "1em" 
	},
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
		fontSize: "50%",
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
	},
	caption: {
		fontSize: "50%",
		padding: "0 0 1em 0",
		color: "#bebfbd"
	},
	text: {
		padding: "2em",
		color: "#bebfbd"
	},
	overlay: show => ({
		position: "fixed", 
		top: 0, 
		left: 0, 
		alignSelf: "flex-start", 
		backgroundColor: "rgba(0, 0, 0, 0.5)", 
		padding: "2em", 
		width: "100%", 
		height: "100%",
		opacity: show ? 1 : 0,
		zIndex: 2
	})	
}


const Overlay = ({ show, change, submit, id, group, type }) => (
	<form onSubmit={ submit } style={ localStyles.overlay(show) } >
		<div>{ type }</div>
		<textarea
			name="textfield" 
			onChange={ e => change(e, type, id) }
			type="text" 
			value={ group[id] }
			style={ { 
				width: "50%", 
				height: "50%", 
				backgroundColor: "rgba(71, 55, 62, 0.2)",
				color: "white"
			} } 
		/>
		<input type="submit" value="Done" style={ { ...styles.button, width: "50%" } } />
	</form> 
)

export default class Edit extends React.Component {
	// static propTypes = {

	// }

	constructor (props) {
		super(props)

		this.cancel = this.cancel.bind(this)
		this.prompt = this.prompt.bind(this)
		this.done = this.done.bind(this)

		this.saveEntry = this.saveEntry.bind(this)
		this.changeEntry = this.changeEntry.bind(this)

		this.add = this.add.bind(this)
		this.delete = this.delete.bind(this)
	}

	state = { captions: {}, text: {}, show: false, current: { type: "", id: "" } }

	componentWillMount () {
		// console.log(this.props)
		let { story } = this.props

		let captions = {}, text = {}

		story.body.forEach(l => {
			captions[l.id] = l.caption
			text[l.id] = l.text
		})

		this.setState({ captions, text, story })
		// this.setState({ story, id })
	}

	cancel () { this.props.history.push(`/story/${this.props.id}`) }
	prompt () { this.setState({ confirm: true }) }
	async delete () {
		let { history, story, id } = this.props

		try {
			history.push('/')
			let r = await db.collection("stories").doc(id).delete()
			console.log(r)
		}
		catch (e) {
			console.log(`error deleting story: ${id} -- (${story.name})`)
			this.setState({ confirm: false })
		}
	}

	done () {
		let { captions, text } = this.state
		// let id = db.collection("stories").doc()
		let { id, story } = this.props

		let body = []

		story.body.forEach(l => {
			body.push(Object.assign({}, l, { captions, text }))
		})

		story.body = body

		// story.user = firebase.auth().currentUser.uid
		// story.name = name

		// save story to database
		try {
			// console.log("updated story: ", story)
			let r = db.collection("stories").doc(id).set(story)
			console.log("successfully inserted story: ", r)
		}
		catch (e) {
			console.log("failed to create new story: ", e)
		}
	}

	add (type, id) {
		console.log(id)
		this.setState({ show: true, current: { type, id } })
	}

	saveEntry (e) {
		e.preventDefault()

		let { current } = this.state

		let { textfield } = e.target
		let field = this.state[current.type]

		field[current.id] = textfield.value
		this.setState({ [current.type]: field, show: false })
	}

	async changeEntry (e) {
		let { current } = this.state
		let v = this.state[current.type]
		v[current.id] = e.target.value
	
		console.log("id", current.id)

		await this.setState({ [current.type]: v })
	}

	// done () {
	// 	let { captions, text } = this.state
	// 	let { story, id } = this.props

		// let story = order.map(id => ({ id, image: images[id], caption: captions[id] || "", text: text[id] || "" }) )
		
	// 	console.log(story)
	// 	this.props.next(story)
	// }


	render () {
		let { show, current, confirm, captions, text } = this.state
		let { story } = this.props

		console.log("story", story)

		return (
			<div style={ styles.whiteBackground } >
				{ confirm && 
					<div style={ localStyles.outerOverlay } >
						<div style={ localStyles.innerOverlay } >You really want to delete this shit?</div>
						<div style={ { ...styles.button, ...localStyles.fatButton } } onClick={ this.delete } >Yes, I never should have created it.</div>
						<div style={ { ...styles.button, ...localStyles.fatButton } } onClick={ e => this.setState({ confirm: false }) } >No, I have unrealistic expectations of the world.</div>	
					</div>
				}

				{ show && 
					<Overlay 
						show={ show } 
						change={ this.changeEntry } 
						submit={ this.saveEntry } 
						id={ current.id } 
						group={ this.state[current.type] } 
						type={ show } 
					/>
				}

				<div style={ localStyles.storyContainer } >

					<div style={ { display: "flex", flexDirection: "row", alignItems: "center" } } >
						<div style={ localStyles.storyName } >{ story ? story.name : "" }</div>
						<div onClick={ this.prompt } style={ { ...styles.button, width: "10%" } } >Delete</div>
						<div onClick={ this.cancel } style={ { ...styles.button, width: "10%" } } >Cancel</div>
					</div>
					{ story.body.map((block, i) => (
						<div key={ i } style={ localStyles.storyBlock } >
							<div style={ localStyles.storyImageContainer } name={ block.id } id={ block.id } onClick={ e => this.add("captions", e.currentTarget.attributes.id.value) } >
								<img style={ localStyles.storyImage } src={ block.image } alt={ block.id } />
							</div>
							<div style={ localStyles.storyCaption } >{ captions[block.id] }</div>
							<div style={ localStyles.storyText } id={ block.id } onClick={ e => this.add("text", e.currentTarget.attributes.id.value) } >{ text[block.id] }</div>
						</div>
					)) }
				</div>

				<div style={ { ...styles.button, margin: "2em 0 0 0" } } onClick={ this.done } >Done</div>
			</div>
		)
	}
}
