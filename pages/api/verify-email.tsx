import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
}

firebase.initializeApp(firebaseConfig)

export default async (req, res) => {
// Confirm the link is a sign-in with email link.
  if (firebase.auth().isSignInWithEmailLink(req.url)) {
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    // The client SDK will parse the code from the link for you.
    try {
      await firebase.auth().signInWithEmailLink(undefined, req.url)
      res.writeHead(301,{Location: 'exp://exp.host/@romanenko/ololo'});
      res.end()
    } catch (error) {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
        console.log(error)
    }
  }
}