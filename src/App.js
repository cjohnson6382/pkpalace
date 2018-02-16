import React from 'react'
import './App.css'
import PropTypes from 'prop-types'

import { BrowserRouter, Route } from 'react-router-dom' // , Redirect

import { styles, listenForAuth } from './utilities' // db, firebase, 
import { bannerMessage } from './content'

import Body from './Body'
import Story from './Story'
import Footer from './Footer'
import Sidebar from './Sidebar'

import Login from './Login'
import Register from './Register'
import Pending from './Pending'

import CreateStory from './CreateStory'
import MyStories from './MyStories'

import Auth from './Auth'
const auth = new Auth()

// firebase.auth().onAuthStateChanged(user => user ? localStorage.setItem('solarfit_logged_in', true) : localStorage.setItem('solarfit_logged_in', false))
// const Landing = () => <div><h1>Click the Sign In button on the left sidebar to get started</h1></div>

class CheckRegistration extends React.Component {
  static propTypes = {
    component: PropTypes.object
  }

  constructor (props) {
    super(props)

    this.checkRegistration = this.checkRegistration.bind(this)
  }

  state = { loading: true, user: {}, auth }

  componentWillMount () {
    this.checkRegistration()
  }

  async checkRegistration () {
  	console.log(this.state.auth.isAuthenticated())
  	console.log("in checkRegistration")

  	if (this.state.auth.isAuthenticated()) {
  		this.setState({ loading: false })	
  	} 
  	else {
  		console.log("listening for auth..., in App.js")
  		listenForAuth()
  	}
    // auth.isAuthenticated() ? this.setState({ loading: false }) : this.setState({ loading: true })
  }

  render () {
    let Component = this.props.Component
    return (
        <div style={ { width: "100%", height: "100%" } } >
          { 
            this.state.loading ? 
              <div>Loading ... </div>
            :
              <Component { ...{ ...this.props, auth } } /> 
          }
        </div>
    )
  }
}


class App extends React.Component {

	// constructor (props) { 
	// 	super(props) 
	// }

	state = { posts: [] }

	auth = new Auth()

	componentWillMount () {
		let posts = []
		this.setState({ posts })
	}

	render() {
		let { posts } = this.state

        //   return auth.isAuthenticated() ? 
        //     <CheckRegistration { ...{ ...rest, Component, auth, ...props } } />
        //   :
        //     <Redirect to={ { pathname: "/waiting", state: { from: props.location } } } /> 
        // }
    const Authorized = ({ component: Component, ...rest }) => {
      return <Route { ...rest } render={ props => <CheckRegistration { ...{ ...rest, Component, auth, ...props } } /> } /> 
    }

		// <Route exact path="/landing" render={ routeProps => <Landing auth={ auth } { ...routeProps } /> } />
		// <Authorized exact path="/map" component={ Home } />


	//	<div style={ styles.paddingTwo } ><Body posts={ posts } /></div>
		return (
			<BrowserRouter>
				<div className="App" style={ styles.siteContainer } >
					<Sidebar posts={ posts } auth={ auth } />
					<div style={ styles.inner } >
						<div style={ styles.paddingTwo } >
							<h2 style={ styles.title } >Archives of the Pk Palace: Nothing Lasts Forever</h2>
							<div style={ styles.boldText } >{ bannerMessage }</div>
						</div>
						<Route exact path="/" render={ routeProps => <Body posts={ posts } auth={ auth } { ...routeProps } /> } />
						<Route exact path="/story/:id" render={ routeProps => <Story auth={ auth } { ...routeProps } /> } />
						<Route exact path="/pending" render={ routeProps => <Pending posts={ posts } auth={ auth } { ...routeProps } /> } />
						<Route exact path="/login" render={ routeProps => <Login auth={ auth } { ...routeProps } /> } />
						<Route exact path="/waiting" render={ () => <div style={ styles.whiteBackground } >You're in asshole jail. Stay here until we let you out. (Loading)</div> } />
						<Route exact path="/register" render={ () => <Register /> } />
						<Authorized exact path="/posts/new" component={ CreateStory } />
						<Authorized exact path="/posts/me" component={ MyStories } />
						<Footer />
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
