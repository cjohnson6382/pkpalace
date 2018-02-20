import createHistory from 'history/createBrowserHistory'
import { firebase, listenForAuth } from './utilities' // db, 

const history = createHistory({ forceRefresh: true })

export default class Auth {
	constructor () {
		this.providerLogin = this.providerLogin.bind(this)
		this.logout = this.logout.bind(this)
		this.isAuthenticated = this.isAuthenticated.bind(this)
	}

	currentUser = firebase.auth().currentUser
	notificationList = []

	providerMap = {
		google: new firebase.auth.GoogleAuthProvider(),
		facebook: new firebase.auth.FacebookAuthProvider()
	}

	async providerLogin (providerName) {
		let provider = this.providerMap[providerName]
		
		if (providerName === "google") {
			provider.addScope("https://www.googleapis.com/auth/firebase")
			provider.addScope("profile")			
		}


		try {
			await firebase.auth().signInWithPopup(provider)
			listenForAuth()
		}
		catch (e) {
			console.log("error signing in", e)
		}
	}

	isAuthenticated () { 
		return !!firebase.auth().currentUser
	}

	subscribeToInitNotification (f) { this.notificationList.push(f) }

	logout () { 
		firebase.auth().signOut()
		history.replace('/')
	}
	
}