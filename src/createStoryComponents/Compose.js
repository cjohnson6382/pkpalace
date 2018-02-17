import React from 'react';
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { styles, firebase, db } from '../utilities'


const localStyles = {
	caption: {
		fontSize: "50%",
		padding: "0 0 1em 0"
	},
	text: {
		padding: "2em"
	}

}


export default class Compose extends React.Component {
	static propTypes = {
		change: PropTypes.func,
		next: PropTypes.func,
		order: PropTypes.array,
		images: PropTypes.object
	}

	constructor (props) {
		super(props)

		this.saveEntry = this.saveEntry.bind(this)
		this.changeEntry = this.changeEntry.bind(this)

		this.addCaption = this.addCaption.bind(this)
		this.addText = this.addText.bind(this)
		this.done = this.done.bind(this)
	}

	state = { captions: {}, text: {}, show: false }

	addCaption (id) {
		console.log(id)
		this.setState({ show: true, current: { id, type: "captions" } })
	}

	addText (id) {
		console.log(id)
		this.setState({ show: true, current: { id, type: "text" } })
	}

	saveEntry (e) {
		e.preventDefault()

		console.log(e.target)


		let { textfield } = e.target
		let { current } = this.state

		console.log(textfield.value)

		console.log(current)

		console.log(this.state)

		let field = this.state[current.type]

		console.log(field)

		field[current.id] = textfield.value
		this.setState({ [current.type]: field, show: false })
	}

	changeEntry (e) {
		let { current } = this.state
		let v = this.state[current.type]
		v[current.id] = e.target.value
		
		this.setState({ [current.type]: v })
	}

	done () {
		let { captions, text } = this.state
		let { images, order } = this.props

		let story = {}

		order.forEach(id => story[id] = { image: images[id], caption: captions[id], text: text[id] } )
		story.order = order
		
		console.log(story)
		this.props.next(story)
	}

	render () {
		let { order, images } = this.props
		let { captions, text, show, current } = this.state

		// console.log(order, images)

		return (
			<div style={ { display: "flex", flexDirection: "column" } } >
				{ show && 
					<form onSubmit={ this.saveEntry } style={ { position: "absolute", top: 0, left: 0, alignSelf: "flex-start", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "2em", width: "100%", height: "100%" } } >
						<input name="textfield" onChange={ this.changeEntry } type="text" value={ this.state[current.type][current.id] } style={ { width: "50%", height: "50%", backgroundColor: "white" } } />
						<input type="submit" style={ { display: "none" } } />
					</form> 
				}
				{
					order.map((name, i) => (
						<div key={ i } >
							<div onClick={ e => this.addCaption(name) } ><img style={ { width: "100%" } } src={ images[name] } alt={ name } /></div>
							{ captions[name] && <div style={ localStyles.caption } >{ captions[name] }</div> }
							{ !text[name] && <div style={ { cursor: "pointer", padding: "2em" } } onClick={ e => this.addText(name) } >[add text]</div> }
							{ text[name] && <div style={ styles.text } onClick={ e => this.addText(name) } >{ text[name] }</div> }
						</div>
					))
				}
				<div style={ { ...styles.button, margin: "2em 0 0 0" } } onClick={ this.done } >Done</div>
			</div>
		)
	}
}

