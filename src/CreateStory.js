import React from 'react';
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { styles, firebase, db } from './utilities'

import Upload from './createStoryComponents/Upload'
import Order from './createStoryComponents/Order'
import Compose from './createStoryComponents/Compose'
import Ready from './createStoryComponents/Ready'

const statusMap = {
	upload: Upload,
	order: Order,
	compose: Compose,
	ready: Ready
}

const statusArray = [
	"upload",
	"order",
	"compose",
	"ready"
]

export default class CreateStory extends React.Component {
	// static propTypes = {

	// }

	constructor (props) {
		super(props)

		// this.change = this.change.bind(this)
		// this.next = this.next.bind(this)
		this.cancel = this.cancel.bind(this)
		this.prompt = this.prompt.bind(this)
		this.done = this.done.bind(this)

		this.uploadFiles = this.uploadFiles.bind(this)
		this.next = this.next.bind(this)
		this.submitOrder = this.submitOrder.bind(this)
		this.preview = this.preview.bind(this)
	}

	state = {
		status: "upload",
		story: {},
		// { name: file }
		images: {},
		files: [],
		name: "",
		order: [],
		// compose: []
	}

	// componentWillMount () {
	// 	console.log(this.props)
	// }

	cancel () { this.props.history.push("/") }
	prompt () { this.setState({ confirm: true }) }
	done () {
		let { story, files, name } = this.state
		let id = db.collection("stories").doc()

		// save images to storage bucket
		let imageRefs = []

		story.user = firebase.auth().currentUser.uid
		story.name = name

		// save story to database
		try {
			let r = db.collection("stories").doc(id).set(story)
			console.log("successfully inserted story: ", r)
		}
		catch (e) {
			console.log("failed to create new story: ", e)
		}
	}

	async uploadFiles (e) {
		// console.log(e.target.files)
		await this.setState({ files: this.state.files.concat(Array.from(e.target.files)) })

		let images = {}

		this.state.files.forEach(f => images[f.name] = window.URL.createObjectURL(f))
		this.setState({ images })
	}

	next () { this.setState({ status: statusArray[statusArray.indexOf(this.state.status) + 1] }) }

	submitOrder (order) { 
		this.setState({ 
			order, 
			status: statusArray[statusArray.indexOf(this.state.status) + 1] 
		}) 
	}

	preview (story) {
		this.setState({ 
			story, 
			status: statusArray[statusArray.indexOf(this.state.status) + 1] 
		})
	}

	render () {			
		const propsMap = {
			upload: { change: this.uploadFiles, next: this.next },
			order: { images: this.state.images, next: this.submitOrder },
			compose: { order: this.state.order, images: this.state.images, next: this.preview },
			ready: { story: this.state.story }
		}

		let { status, confirm } = this.state
		let Component = statusMap[status]

		// console.log(this.state)

		let props = propsMap[status]

		return (
			<div style={ styles.whiteBackground } >
				{ confirm && 
					<div style={ { top: 0, left: 0, width: "100%", alignSelf: "flex-start", alignItems: "center", justifyContent: "center", height: "100%", position: "absolute", display: "flex", flexDirection: "column", backgroundColor: "rgba(0, 0, 0, 0.3)" } } >
						<div style={ { backgroundColor: "rgba(255, 0, 0, 0.7)", fontSize: "150%", color: "white", padding: "2em", width: "40%", margin: "1em" } } >Are you giving up?</div>
						<div style={ { ...styles.button, fontSize: "125%", width: "40%", padding: "2em" } } onClick={ this.cancel } >Yes, Yes I am.</div>
						<div style={ { ...styles.button, fontSize: "125%", width: "40%", padding: "2em" } } onClick={ e => this.setState({ confirm: false }) } >No Mames, Senor</div>	
					</div>
				}			
				<div style={ styles.paddingTwo } >
					<Component { ...props } />
				</div>
				<div style={ styles.button } onClick={ this.prompt } >Cancel</div>
			</div>
		)
	}
}