import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
}

firebase.initializeApp(firebaseConfig)

const REDIRECT_URL = 'exp://f3-d7k.romanenko.ololo.exp.direct:80'

export default async (req, res) => {
  // Confirm the link is a sign-in with email link.
  if (firebase.auth().isSignInWithEmailLink(req.url)) {
    res.writeHead(301, { Location: `${REDIRECT_URL}/?link=${encodeURIComponent(req.url)}` })

    return res.end()
  }

  res.status(406).end()
}
