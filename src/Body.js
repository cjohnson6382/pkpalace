import React from 'react'

import { Link } from 'react-router-dom'

import Summary from './Summary'
import Title from './Title'

import { styles } from './utilities'
import { demoPostTitle, demoPostContent } from './content'

const Body = ({ posts }) => {
	return (
		<div style={ styles.whiteBackground } >
			<div style={ styles.paddingTwo } >
				{ posts.map((p, i) => (
					<div key={ i } style={ { padding: "0 0 1em 0", display: "flex", flexDirection: "row" } } >
						<Link style={ { width: "30%", padding: "0 1em 0 0 " } } to={ `/story/${p.id}` }><img style={ { width: "100%", height: "100%" } } src={ p.body[0].image } alt={ p.body[0].id } /></Link>
						<div>
							<Title title={ p.name } />
							{ p.body.filter(b => b.text).length > 0 && <Summary story={ p.body.map(b => b.text).slice(1, 3).join(".") } id={ p.id } /> }
							{ p.body.filter(b => b.text).length < 1 && <Summary story="This is a picture story" id={ p.id } /> }
						</div>
					</div>
				)) }
				{ posts.length < 1 && <div style={ { padding: "2em 0 0 0" } } >[Placeholder for Stories]</div> }
			</div>
		</div>
	)
}

export default Body