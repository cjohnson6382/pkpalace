import React from 'react'

import Summary from './Summary'
import Title from './Title'

import { styles } from './utilities'
import { demoPostTitle, demoPostContent } from './content'

const Body = ({ posts }) => {
	return (
		<div style={ styles.whiteBackground } >
			<div style={ styles.paddingTwo } >
				<div>
					<Title title={ demoPostTitle } />
					<Summary story={ demoPostContent.split(". ", 3).join(". ") } id="10" />
				</div>
				{ posts.map(p => (
					<div>
						<Title title={ p.title } />
						<Summary story={ p.story.split(".", 3).join(".") } id={ p.id } />	
					</div>
				)) }
			</div>
		</div>
	)
}

export default Body