// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3dEfJjNZyjumuFr8CHVQKHwXGxmTgagc",
  authDomain: "pathfinder-69914.firebaseapp.com",
  projectId: "pathfinder-69914",
  storageBucket: "pathfinder-69914.appspot.com",
  messagingSenderId: "1088667373664",
  appId: "1:1088667373664:web:d882cf0e40a962f1a2f305",
  measurementId: "G-XN3NSK8T51"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp;