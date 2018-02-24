import React from 'react'
import PropTypes from 'prop-types'

import { db } from './utilities'

const detailedHOC = (WrappedComponent) => {
	return class extends React.Component {
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
			let r = await db.collection("stories").doc(this.props.match.params.id).get()
			let story = r.data()
			let id = r.id
			this.setState({ story, id, loading: false })
		}

		async componentWillReceiveProps (nextProps) {
			await this.setState({ loading: true })
			let r = await db.collection("stories").doc(nextProps.match.params.id).get()
			let story = r.data()
			let id = r.id
			this.setState({ story, loading: false })
		}

		render () { 
			let { story, loading } = this.state
			return (
				<div>
					{ loading ? <div>Loading...</div> : <WrappedComponent { ...this.props } { ...this.state } />  }
				</div>
			)
		}
	}
}

export default detailedHOC