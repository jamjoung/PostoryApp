// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAOAvp_R51X4Brp-QTjiA2IUjOrqR-WR1g",
//   authDomain: "t9hacks2023.firebaseapp.com",
//   projectId: "t9hacks2023",
//   storageBucket: "t9hacks2023.appspot.com",
//   messagingSenderId: "774077123529",
//   appId: "1:774077123529:web:1d720e3674b3fed88b3618"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// *** NEW DB ****
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACx_oZ4s1DOcEHTmHgVE8dE_LaOjpUdPg",
  authDomain: "postory-8c7eb.firebaseapp.com",
  projectId: "postory-8c7eb",
  storageBucket: "postory-8c7eb.appspot.com",
  messagingSenderId: "890116392442",
  appId: "1:890116392442:web:417b13d13c4cea060ed043"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db }