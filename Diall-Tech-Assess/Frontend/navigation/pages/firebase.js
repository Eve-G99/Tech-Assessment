import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDsp_tVcLogcmO0jlQc_H3rnnM_WKMtawU",
    authDomain: "diall-assessment-66398.firebaseapp.com",
    projectId: "diall-assessment-66398",
    storageBucket: "diall-assessment-66398.appspot.com",
    messagingSenderId: "702358280439",
    appId: "1:702358280439:web:60034e6f41275b08775bf2",
    measurementId: "G-SK8JBP9H5F"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const app = initializeApp(firebaseConfig);

export {app, firebase}