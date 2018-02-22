import React from 'react'
import './App.css'
import PropTypes from 'prop-types'

import { BrowserRouter, Route, Redirect } from 'react-router-dom' // , Redirect

import { db, firebase, styles, listenForAuth } from './utilities'

import Body from './Body'
import Detailed from './Detailed'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

import Login from './Login'
import Register from './Register'
import Pending from './Pending'

import CreateStory from './CreateStory'
import MyStories from './MyStories'

import Auth from './Auth'
const auth = new Auth()


class CheckRegistration extends React.Component {
  static propTypes = {
    component: PropTypes.object
  }

  constructor (props) {
    super(props)

    this.checkRegistration = this.checkRegistration.bind(this)
  }

  state = { loading: true, user: {}, auth }

  async componentWillMount () {
    this.checkRegistration()
  }

  async getUser () {

    let u = await db.collection("users").doc(firebase.auth().currentUser.uid).get()
    let user = u.data()

    this.setState({ user, loading: false })
  }

  async checkRegistration () {
  	console.log(this.state.auth.isAuthenticated())
  	console.log("in checkRegistration")

  	if (this.state.auth.isAuthenticated()) {
  		this.getUser()
  	}
  	else {
  		console.log("listening for auth..., in App.js")
  		listenForAuth()
  	}
    // auth.isAuthenticated() ? this.setState({ loading: false }) : this.setState({ loading: true })
  }

  render () {
    let Component = this.props.Component
    let { user } = this.state

    console.log(user)

    return (
        <div style={ { width: "100%", height: "100%" } } >
          { 
            this.state.loading ? 
              <div style={ { color: "#bebfbd" } } >Loading ... </div>
            :
              user && user.pending ? 
                  <Redirect to={ { pathname: "/pending" } } />
                :
                  <Component { ...{ ...this.props, auth } } />
          }
        </div>
    )
  }
}


class App extends React.Component {

	constructor (props) { 
		super(props) 

    this.watchStoryDB = this.watchStoryDB.bind(this)
	}

	state = { posts: [], unsubscribe: () => { console.log("unsubscribe has not been set yet") } }

	auth = new Auth()

	async componentWillMount () {
    this.watchStoryDB()

		let pp = await db.collection("stories").get()

		let posts = []

		pp.forEach(p => {
			let { name, body } = p.data()
			posts.push({ name, body, id: p.id })
		})

		this.setState({ posts })
	}

  comonentWillUnmount () {
    let { unsubscribe } = this.state
    unsubscribe()
  }

  watchStoryDB () {
    let unsubscribe = db.collection("stories").onSnapshot(async snapshot => {
      snapshot.docChanges.forEach(async change => {
        let { posts } = this.state
        if (change.type === "added" || change.type === "modified") { 
          let post = Object.assign({}, change.doc.data(), { id: change.doc.id })
          posts.push(post) 
        }
        else if (change.type === "removed") {
          let pindex = posts.map(p => p.id).indexOf(change.doc.id)
          posts.slice(pindex, 1)
        }
        else { console.log("unknown change type: ", change) }

        await this.setState({ posts })
      })
    })

    this.setState({ unsubscribe })
  }

	render() {
		let { posts } = this.state

    const Authorized = ({ component: Component, ...rest }) => {
      return <Route { ...rest } render={ props => <CheckRegistration { ...{ ...rest, Component, auth, ...props } } /> } /> 
    }

		return (
			<BrowserRouter>
        <div>
  				<div style={ { ...styles.paddingTwo, display: "flex", flexDirection: "column" } } >
            <Header />          
  					<div className="App" style={ styles.siteContainer } >
  						<div style={ { width: "15%" } } ><Sidebar posts={ posts } auth={ auth } /></div>
  						<div style={ styles.inner } >
  							<Route exact path="/" render={ routeProps => <Body posts={ posts } auth={ auth } { ...routeProps } /> } />
  							<Route exact path="/story/:id" render={ routeProps => <Detailed auth={ auth } { ...routeProps } /> } />
  							<Route exact path="/pending" render={ routeProps => <Pending posts={ posts } auth={ auth } { ...routeProps } /> } />
  							<Route exact path="/login" render={ routeProps => <Login auth={ auth } { ...routeProps } /> } />
  							<Route exact path="/waiting" render={ () => <div style={ styles.whiteBackground } >You're in asshole jail. Stay here until we let you out. (Loading)</div> } />
  							<Route exact path="/register" render={ routeProps => <Register { ...routeProps } /> } />
  							<Authorized exact path="/posts/new" component={ CreateStory } />
  							<Authorized exact path="/posts/me" component={ MyStories } />
  							<Footer />
  						</div>
  					</div>
  				</div>
        </div>
			</BrowserRouter>
		);
	}
}

export default App;
