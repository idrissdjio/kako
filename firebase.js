// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlTY7PJZPimstZps9YuPKT3zM4qvcOPig",
  authDomain: "kako-b4e01.firebaseapp.com",
  databaseURL: "https://kako-b4e01-default-rtdb.firebaseio.com",
  projectId: "kako-b4e01",
  storageBucket: "kako-b4e01.appspot.com",
  messagingSenderId: "208864560446",
  appId: "1:208864560446:web:79debad1d9a6889f22186f",
  measurementId: "G-1FCKMD9K8S"
};

let app;
if(firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app()
  }
  
const auth = firebase.auth()

export { auth, firebase};