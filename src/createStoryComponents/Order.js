import React from 'react';
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { styles } from '../utilities' // , firebase, db


const localStyles = {
	grid: {
		display: "flex",
		flexFlow: "row wrap"
	},
	gridItems: picked => ({
		opacity: picked ? 0.5 : 1,
		width: "25%"
	})
}

export default class Order extends React.Component {
	static propTypes = {
		images: PropTypes.object,
		next: PropTypes.func
	}

	constructor (props) {
		super(props)

		this.chooseOrder = this.chooseOrder.bind(this)
		this.done = this.done.bind(this)
	}

	// componentWillMount () {

	// }

	state = { currentNumber: 1, ordering: {} }

	chooseOrder (id) {
		let { ordering, currentNumber } = this.state
		// console.log(id)


		console.log(!!ordering[id])

		if (!isNaN(ordering[id])) {
			console.log("id is in ordering, deleting")
			delete ordering[id]
		} 
		else {
			console.log("adding to ordering: ", currentNumber, id)
			ordering[id] = currentNumber
			currentNumber += 1
		}

		let a = Object.entries(ordering).sort((a, b) => a[1] > b[1])
		// console.log(a)

		let b = a.map(a => a[0])
		// console.log(b)

		ordering = {}
		b.forEach((a, i) => ordering[a] = i)

		console.log(ordering)

		this.setState({ ordering, currentNumber: Object.keys(ordering).length })

	}

	done () {
		let { ordering } = this.state // , imageMap

		let a = Object.entries(ordering).sort((a, b) => a[1] > b[1])
		// console.log(a)

		let b = a.map(a => a[0])
		console.log(b)

		// let c = b.map(i => imageMap[i])
		this.props.next(b)
	}

	render () {
		let { images } = this.props // , next
		let { ordering } = this.state

		return (
			<div>
				<h4>Order</h4>
				<p>
					Just click on the images in the order you wish them to appear in the story. 
					They will dim to indicate that they have been selected. 
					When you are done, hit done. 
					Any images that have not been selected will not be included in your story.
				</p>
				<div style={ localStyles.grid } >
					{ Object.entries(images).map((image) => (
							<div onClick={ e => this.chooseOrder(image[0]) } style={ localStyles.gridItems(!isNaN(ordering[image[0]])) } key={ image[0] } >
								<img style={ { width: "100%" } } src={ image[1].objectURL } alt={ image[0] } />
							</div>
						))
					}					
				</div>
				<div onClick={ this.done } style={ styles.button } >Done</div>
			</div>
		)
	}
}