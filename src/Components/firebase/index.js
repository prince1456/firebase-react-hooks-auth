import app  from 'firebase/app';
import 'firebase/auth'
import 'firebase/firebase-firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCDvfJVYAv4GeznRe3AlB62ZnURl1_Nkykss",
    authDomain: "authenicatiobn.firebaseapp.com",
    databaseURL: "https://authenicatiobn.firebaseio.com",
    projectId: "authenicatiobna",
    storageBucket: "",
    messagingSenderId: "96420172s8987",
    appId: "1:964201728987:web:2e3fs3433fdb73ba52ab5fe"
  };
  // Initialize Firebase
  class Firebase {
	constructor() {
		app.initializeApp(firebaseConfig)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addQuote(quote) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`authenicatiobn/${this.auth.currentUser.uid}`).set({
			quote
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getCurrentUserQuote() {
		const quote = await this.db.doc(`authenicatiobn/${this.auth.currentUser.uid}`).get()
		return quote.get('quote')
	}
}

export default new Firebase()
