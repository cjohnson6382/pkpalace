import React from 'react'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Story from'./Story'

import { db } from './utilities' // styles, 

export default class Detailed extends React.Component {
	static propTypes = {
		auth: PropTypes.object, 
		match: PropTypes.object,
		location: PropTypes.object
	}

	// constructor (props) {
	// 	super(props)
	// }

	state = { story: { body: [] }, loading: true }

	async componentWillMount () {
		let story = (await db.collection("stories").doc(this.props.match.params.id).get()).data()
		this.setState({ story, loading: false })
	}

	async componentWillReceiveProps (nextProps) {
		await this.setState({ loading: true })
		let story = (await db.collection("stories").doc(nextProps.match.params.id).get()).data()
		this.setState({ story, loading: false })
	}

	render () {
		let { story } = this.state
		return <Story story={ story } />
	}
}