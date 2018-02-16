import * as firebase from 'firebase'
import firestore from 'firebase/firestore'
import { firebaseConfig } from './config'

import createHistory from 'history/createBrowserHistory'
const history = createHistory({ forceRefresh: true })

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()

export { firebase }

export const registerUsername = async name => {
	let id = firebase.auth().currentUser.uid
	let timestamp = firebase.firestore.FieldValue.serverTimestamp()	

	console.log(firebase.auth().currentUser.uid)
	let u = (await db.collection("users").doc(firebase.auth().currentUser.uid).get()).data()

	console.log("register username, u: ", u)

	if (!u) {
		u = {}

		u.id = id
		u.name = name
		u.created = timestamp
		u.updated = timestamp
		u.pending = true
	}
	else {
		u.updated = timestamp
		u.name = name
	}

	try {
		await db.collection("users").doc(id).set(u)
		console.log("successfully created/updated user")
		return u
	} catch (e) {
		console.log("error setting body to pending collection: ", e)
		return null
	}

}

export const getPosts = async collection => {
	try {
		let response = await db.collection(collection).get()
		let ra = {}
		response.forEach(a => Object.assign(ra, { [a.id]: { ...a.data(), id: a.id } }))

		return ra
	} catch (e) {
		console.log("failed to get items (error suppressed)")
		return []
	}

}

export const getPost = async id => {
	let docRef = await db.collection("posts").doc(id)
	let doc = await docRef.get()
	if (doc.exists) {
		let data = await doc.data()
		return Object.assign(data, { id: docRef.id })		
	}
	else return null

}


export const listenForAuth = () => {
	console.log("listening for auth change")
	let unsubscribe = firebase.auth().onAuthStateChanged(async user => {
		console.log("auth state has changed: ", user)
		if (user) {
			let u = (await db.collection("users").doc(user.uid).get()).data()
				if (firebase.auth().currentUser.uid && !u) {
				history.push("/register")
				unsubscribe()
			}

			console.log(u)

			if (u.pending === true) {
			  console.log("about to push to pending: ", u)
			  history.push("/pending")
			  unsubscribe()
			}

			if (u.pending === false) {
				console.log("user is all setup and ready to be used")
				history.location.pathname === "/" ? null : history.push("/")
				unsubscribe()
			}
		}
		else { 
		  	history.push("/login")
		  	unsubscribe()
		}
	})
}

export const styles = {
	wide: {
		width: "100%",
		backgroundColor: "ivory"
	},
	siteContainer: {
		display: "flex",
		flexDirection: "row"
	},
	fourHigh: {
		height: "4em"
	},
	centeredJustified: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: "0.5em"
	},
	paddingTwo: {
		padding: "2em"
	},
	sidebar: {
		width: "20%",
		height: "inherit",
		backgroundColor: "lightgrey",
		padding: "0.5em 0 0.5em 0"
	},
	inner: {
		display: "flex",
		flexDirection: "column",
		width: "80%",
		backgroundColor: "cyan"
	},
	boldText: {
		fontWeight: "bold"
	},
	title: {
		margin: "0"
	},
	sidebarBanner: {
		fontSize: "75%",
		margin: "0 0 0.5em 0"
	},
	postTitle: {
		fontSize: "125%",
		fontWeight: "bold",
		padding: "0 0 0.5em 0"
	},
	bodyContent: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column"
	},
	whiteBackground: {
		backgroundColor: "white",
		padding: "0.5em"
	},
	summaryContainer: {
		padding: "0 0 0.5em 0"
	},
	button: {
		backgroundColor: "black",
		color: "white",
		textDecoration: "none",
		cursor: "pointer",
		padding: "0.3em",
		borderBottom: "1px solid white",
		fontSize: "75%",
		width: "100%"
	}
}