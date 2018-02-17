import React from 'react';
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { styles, firebase, db } from '../utilities'

// add a name for the story, render it, let the user save it, or go back to editing it
const Ready = ({ change, next }) => <div onChange={ change } >Ready</div>

export default Ready