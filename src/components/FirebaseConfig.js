import firebase from 'firebase';

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBhGLfZJ4w4qQLypuon-wagj-MtyrVynCA",
    authDomain: "price-alert-b929f.firebaseapp.com",
    projectId: "price-alert-b929f",
    storageBucket: "price-alert-b929f.appspot.com",
    messagingSenderId: "655323387860",
    appId: "1:655323387860:web:20dad762b6dc5db5b2e841",
    measurementId: "G-K1QJCECS28"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { auth };