import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAo4BCF9X4mVwi85zP23j0easmIaEF_L-Q",
  authDomain: "firegram-32a3b.firebaseapp.com",
  projectId: "firegram-32a3b",
  storageBucket: "firegram-32a3b.appspot.com",
  messagingSenderId: "282225920848",
  appId: "1:282225920848:web:9d7db5242476a671dcfa55",
};

// === Init Firebase App connection to backend
const fb = firebase.initializeApp(firebaseConfig);

// === Init Services
// Initialize Authentication Service
const auth = firebase.auth(); // Or, projectAuth

// Initialize Firestore Service
// NOTE It's this that allows us to interact with our Firestore
// to add documents, retrieve collections, etc.
const db = firebase.firestore(fb); // Or, projectFirestore

// Initialize Firebase Storage Service
const storage = firebase.storage();

// === Timestamp
// Let's add a timestamp FieldValue to export to other files.
// NOTE We are storing a FUNCTION REFERENCE in timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

// Export it so we can import/use Firebase into other files/components
export { fb, auth, db, storage, timestamp };
