import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { styles, db } from './utilities'

export default class Story extends React.Component {
	static propTypes = { auth: PropTypes.object }

	state = { story: {} }

	async componentWillMount () {
		let story = (await db.collection("stories").doc(this.props.match.params.id).get()).data()
		this.setState({ story })
	}

	render () {
		let { story } = this.state

		return (
			<div>
				<div>{ story.name }</div>
				<div>{ story.body }</div>
			</div>
		)
	}
}

// const Story = ({ content, id }) => (
// 	<div style={ styles.bodyContent } >
// 		<div style={ styles.summaryContainer } >{ content }</div>
// 		<Link to={ `/story/${id}` }>Tell Me More, Daddy...</Link>
// 	</div>
// )

// export default Story