import React from 'react';
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { styles } from '../utilities' // , firebase, db


const localStyles = {
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

	state = { captions: {}, text: {}, showCaption: false, showText: false, current: { type: "", id: "" } }

	addCaption (type, id) {
		console.log(id)
		this.setState({ showCaption: true, current: { type, id } })
	}

	addText (type, id) {
		console.log(id)
		this.setState({ showText: true, current: { type, id } })
	}

	saveEntry (e) {
		e.preventDefault()

		let { current } = this.state

		let { textfield } = e.target
		let field = this.state[current.type]

		field[current.id] = textfield.value
		this.setState({ [current.type]: field, showText: false, showCaption: false })
	}

	async changeEntry (e) {
		let { current } = this.state
		let v = this.state[current.type]
		v[current.id] = e.target.value
	
		console.log("id", current.id)

		await this.setState({ [current.type]: v })
	}

	done () {
		let { captions, text } = this.state
		let { images, order } = this.props

		let story = order.map(id => ({ id, image: images[id], caption: captions[id] || "", text: text[id] || "" }) )
		
		console.log(story)
		this.props.next(story)
	}

	render () {
		let { order, images } = this.props
		let { captions, text, showCaption, showText } = this.state // , current

		return (
			<div style={ { display: "flex", flexDirection: "column" } } >
				<h4>Add text to your images</h4>
				<p>Click on an image to add a caption underneath it. Click on the 'Add Text' button beneath an image to add text</p>
				{
					order.map((name, i) => (
						<div key={ i } >
							<div>
								<img 
									onClick={ e => this.addCaption("captions", name) }
									style={ { width: "100%" } } 
									src={ images[name].objectURL } 
									alt={ name } 
								/>
								{ showCaption && 
									<Overlay 
										show={ showCaption } 
										change={ this.changeEntry } 
										submit={ this.saveEntry } 
										id={ name } 
										group={ captions } 
										type="captions" 
									/>
								}
							</div>
							<div>{ captions[name] && <div style={ localStyles.caption } >{ captions[name] }</div> }</div>
							<div>
								{ showText &&
									<Overlay 
										show={ showText } 
										change={ this.changeEntry } 
										submit={ this.saveEntry } 
										id={ name } 
										group={ text } 
										type="text" 
									/>
								}
								{ !text[name] && 
									<div 
										style={ { 
											cursor: "pointer", 
											padding: "2em",
											color: "#bebfbd"
										} } 
										onClick={ e => this.addText("text", name) } 
									>
										[add text]
									</div> 
								}
								{ text[name] && 
									<div 
										style={ localStyles.text } 
										onClick={ e => this.addText("text", name) } 
									>
										{ text[name] }
									</div> 
								}
							</div>
						</div>
					))
				}
				<div style={ { ...styles.button, margin: "2em 0 0 0" } } onClick={ this.done } >Done</div>
			</div>
		)
	}
}

