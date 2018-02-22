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
				// console.log(history.location.pathname)
				history.push("/") // history.location.pathname === "/" ? null : 
				unsubscribe()
			}
		}
		else { 
			console.log("pushing back to login")
		  	history.push("/login")
		  	unsubscribe()
		}
	})
}

export const styles = {
	wide: {
		width: "100%",
		backgroundColor: "#0b0000",
		color: "#bebfbd"
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
		// width: "20%",
		height: "100%",
		backgroundColor: "#271927",
		color: "#bebfbd",
		// padding: "0.5em 0 0.5em 0"
	},
	inner: {
		display: "flex",
		flexDirection: "column",
		width: "85%",
		backgroundColor: "#271927"
	},
	boldText: {
		fontWeight: "bold"
	},
	title: {
		margin: "0",
		fontSize: "110%"
	},
	sidebarBanner: {
		fontSize: "75%",
		margin: "0 0 0.5em 0"
	},
	sidebarText: {
		// border: "1px solid rebeccapurple",
		// backgroundColor: "purple",
		background: "linear-gradient(#271927, rgba(199, 21, 133, 0.3))",
		padding: "0.2em",
		textDecoration: "none",
		margin: "0 0 0.5em 0",
		color: "#bebfbd"
	},
	postTitle: {
		fontSize: "125%",
		fontWeight: "bold",
		padding: "0 0 0.3em 0"
	},
	bodyContent: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		color: "rgba(71, 55, 62, 0.2)"
	},
	whiteBackground: {
		backgroundColor: "rgba(71, 55, 62, 0.2)",
		padding: "0.5em",
		color: "#bebfbd"
	},
	summaryContainer: {
		padding: "0 0 0.5em 0",
		color: "rgba(190, 191, 189, 0.3)"
	},
	button: {
		// backgroundColor: "purple",
		background: "radial-gradient(mediumpurple, purple, black, #271927, #271927)",
		color: "#bebfbd",
		textDecoration: "none",
		cursor: "pointer",
		padding: "0.3em",
		// borderBottom: "1px solid rebeccapurple",
		fontSize: "75%",
		width: "100%"
	}
}