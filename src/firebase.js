import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDKIIxJ_AcEs3FHZNmqAttV2cKSw_XuzI0",
  authDomain: "akcreative-fb419.firebaseapp.com",
  databaseURL: "https://akcreative-fb419-default-rtdb.firebaseio.com",
  projectId: "akcreative-fb419",
  storageBucket: "akcreative-fb419.appspot.com",
  messagingSenderId: "172683769090",
  appId: "1:172683769090:web:7e31ce964a3ee8b6d03e1b",
  measurementId: "G-7D9RYVT2LE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
