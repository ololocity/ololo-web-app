import * as firebase from 'firebase'
import { parse as parseUrl } from 'url'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
}

firebase.initializeApp(firebaseConfig)

const REDIRECT_URL = 'exp://exp.host/@romanenko/ololo'

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
      const { query: { email } } = parseUrl(req.url, true)

      const result = await firebase
        .auth()
        .signInWithEmailLink(String(email), req.url)

      console.log("User's e-mail verified", result)

      res.writeHead(301, { Location: REDIRECT_URL })
      res.end()
    } catch (error) {
      // Common errors could be invalid email and invalid or expired OTPs.
      console.log(`Error verifying e-mail. Code: ${error.code}`)
      console.log(error)
    }
  }
}
