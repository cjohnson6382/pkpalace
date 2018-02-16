import React from 'react';
// import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

import { styles } from './utilities'

const Upload = ({ change, next }) => (
	<div style={ { display: "flex", flexDirection: "column" } } >
		<div style={ styles.boldText } >Choose Some Pictures to Upload</div>
		<input style={ { width: "100%", height: "100%" } } type="file" multiple accept="image/*" onChange={ change } />
		<div style={ styles.button } onClick={ next } >Done</div>
	</div>
)
const Order = ({ change, next }) => <div onChange={ change } >test</div>
const Captions = ({ change, next }) => <div onChange={ change } >test</div>
const Content = ({ change, next }) => <div onChange={ change } >test</div>
const Ready = ({ change, next }) => <div onChange={ change } >test</div>

const statusMap = {
	upload: Upload,
	order: Order,
	captions: Captions,
	content: Content,
	ready: Ready
}

const statusArray = [
	"upload",
	"order",
	"captions",
	"content",
	"ready"
]

export default class CreateStory extends React.Component {
	// static propTypes = {

	// }

	constructor (props) {
		super(props)

		this.change = this.change.bind(this)
		this.next = this.next.bind(this)
		this.cancel = this.cancel.bind(this)
		this.prompt = this.prompt.bind(this)
	}

	state = {
		status: "upload",
		story: [],
		images: [],
		order: [],
		captions: [],
		content: []
	}

	// componentWillMount () {
	// 	console.log(this.props)
	// }

	change (things) { this.setState({ [this.state.status]: things }) }
	next () { this.setState({ status: statusArray[statusArray.indexOf(this.state.status) + 1] }) }
	cancel () { this.props.history.push("/") }
	prompt () { this.setState({ confirm: true }) }

	render () {			
		let { status, confirm } = this.state
		let Component = statusMap[status]

		let props = { change: this.change, next: this.next }

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