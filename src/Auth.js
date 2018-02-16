import createHistory from 'history/createBrowserHistory'
import { firebase, listenForAuth } from './utilities' // db, 

const history = createHistory({ forceRefresh: true })

export default class Auth {
	constructor () {
		this.providerLogin = this.providerLogin.bind(this)
		// this.usernamePasswordLogin = this.usernamePasswordLogin.bind(this)
		this.logout = this.logout.bind(this)
		this.isAuthenticated = this.isAuthenticated.bind(this)

		firebase.auth().onAuthStateChanged(user => {
			this.notificationList.map(f => f(user))
			this.currentUser = user
		})
	}

	currentUser = firebase.auth().currentUser
	notificationList = []

	// async register (email, password) {
	// 	try { 
	// 		firebase.auth().createUserWithEmailAndPassword(email, password)
	// 		history.replace('/')
	// 	}
	// 	catch (e) { console.log(e.code, e.message) }
		
	// }

	// async usernamePasswordLogin (email, password) {
	// 	try { 
	// 		let r = await firebase.auth().signInWithEmailAndPassword(email, password)
	// 		console.log(r)
	// 		history.replace("/")
	// 	}
	// 	catch (e) { console.log(e.code, e.message) }
	// }

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

			// let unsubscribe = firebase.auth().onAuthStateChanged(async user => {
			// 	console.log("auth state has changed: ", user)
			// 	if (user) {
			// 		let u = (await db.collection("users").doc(user.uid).get()).data()
			// 			if (firebase.auth().currentUser.uid && !u) {
			// 			history.push("/register")
			// 			unsubscribe()
			// 		}

			// 		console.log(u)

			// 		if (u.pending === true) {
			// 		  console.log("about to push to pending: ", u)
			// 		  history.push("/pending")
			// 		  unsubscribe()
			// 		}

			// 		if (u.pending === false) {
			// 			console.log("user is all setup and ready to be used")
			// 			history.push("/")
			// 			unsubscribe()
			// 		}
			// 	}
			// 	else { 
			// 	  	history.push("/login")
			// 	  	unsubscribe()
			// 	}
			// })
		}
		catch (e) {
			console.log("error signing in", e)
		}
	}

	isAuthenticated () { return !!this.currentUser }

	subscribeToInitNotification (f) { this.notificationList.push(f) }

	logout () { 
		firebase.auth().signOut()
		history.replace('/')
	}
	
}