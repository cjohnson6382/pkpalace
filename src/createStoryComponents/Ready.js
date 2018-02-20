import React from 'react';
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { styles, firebase, db } from '../utilities'

import Story from '../Story'

const storageRef = firebase.storage().ref();


// add a name for the story, render it, let the user save it, or go back to editing it
// upload all the pics to storage, place the storage IDs on the story object
/*
	let { images, story } = this.props

	story.map(image => { 
		//	get the image
		let imageFile = images[image.id]
		//	save image to storage
		let storage = {} // upload to storage

		//	get a storage id
		image.id = storage.id 
	})

	// should dispatch "uploading to storage" to a web worker so that the user can navigate around?
*/

export default class Ready extends React.Component {
	static propTypes = {
		clear: PropTypes.func
	}

	constructor (props) {
		super(props)

		this.progress = this.progress.bind(this)
		this.error = this.error.bind(this)
		this.uploadStory = this.uploadStory.bind(this)
		this.submit = this.submit.bind(this)
	}

	state = {
		done: { name: "", body: [] },
		ready: false
	}

	async componentWillMount () {
		await this.submit()
	}

	progress (snapshot) {
		let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
		console.log(`upload is ${progress}% done`)

		switch (snapshot.state) {
			case firebase.storage.TaskState.PAUSTED:
				console.log("upload paused")
				break 
			case firebase.storage.TaskState.RUNNING: 
				console.log("upload running")
				break
			default:
				console.log(snapshot.state)
		}
	}

	error (error) {
		console.log("an error occurred during image upload...")
		switch (error.code) {
			case 'storage/unauthorized': 
				console.log("insufficient privileges to store this file")
				break
			case 'storage/canceled': 
				console.log("user canceled the file upload")
				break
			default:
				console.log("some kinda error: ", error)
		}
	}

	async uploadStory () {
		let { done } = this.state

		console.log(done)

		done.user = firebase.auth().currentUser.uid

		try {
			let r = await db.collection("stories").add(done)
			console.log("successfully inserted story into DB", r)
			this.props.clear()
		}
		catch (e) {
			console.log("error uploading story to database", e)
		}

	}

	async submit () {
		let { images, story } = this.props

		story.body.forEach(image => {
			let imageFile = images[image.id].image
			let metadata = { contentType: imageFile.type }

			console.log(imageFile, metadata)

			let uploadTask = storageRef.child('images/' + image.id).put(imageFile, metadata)

			uploadTask.on(
				firebase.storage.TaskEvent.STATE_CHANGED, 
				this.progress, 
				this.error, 
				async () => { 
					image.image = uploadTask.snapshot.downloadURL
					// this.state.done.body.concat(image)					
					// let done = Object.assign({}, this.state.done, { body: this.state.done.concat(image) })
					// await this.setState({ done })

					await this.setState({ done: { body: this.state.done.body.concat(image) } })
					
					if (this.state.done.body.length === story.body.length ) this.setState({ ready: true })
				}
			)
		})
	}

	render () {
		let { story } = this.props
		let { ready, done } = this.state

		let combined = Object.assign({}, story, done)

		return (
			<div>
				<div style={ { padding: "1em" } } >
					<div style={ { fontWeight: "bold", padding: "0 1em 0 0" } }>Give it a name</div>
					<input onChange={ e => this.setState({ done: Object.assign({}, this.state.done, { name: e.target.value }) }) } type="text" />
				</div>
				<h4>Preview</h4>
				<div style={ { padding: "0 0 2em 0" } } >Scroll to the bottom to approve</div>
				<Story story={ combined } />
				{ ready && <div style={ styles.button } onClick={ this.uploadStory } >Post</div> }
				{ !ready && <div>Uploading pictures to the magical storage place</div> }
			</div>
		)
	}
}

// const Ready = ({ change, next }) => <div onChange={ change } >Ready</div>
// export default Ready