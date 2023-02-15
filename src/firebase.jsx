import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCRkhlbj_PqiOzLnNUK43eTA9B29vBCATA",
//   authDomain: "alphadatabase-6609c.firebaseapp.com",
//   databaseURL:
//     "https://alphadatabase-6609c-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "alphadatabase-6609c",
//   storageBucket: "alphadatabase-6609c.appspot.com",
//   messagingSenderId: "1019230094129",
//   appId: "1:1019230094129:web:8e28da4615a0c086b7a610",
// };

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_SERVER_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_SERVER_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_SERVER_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_SERVER_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_SERVER_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_SERVER_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_SERVER_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { storage };
