import { createApp } from 'vue'
import firebase from 'firebase/compat'


import App from './App.vue'


const firebaseConfig = {

    apiKey: "AIzaSyA3zPDsVkEnlrRyFNUK0Mti1YiKN7a2mzA",

    authDomain: "invipk.firebaseapp.com",
  
    projectId: "invipk",
  
    storageBucket: "invipk.appspot.com",
  
    messagingSenderId: "321057762782",
  
    appId: "1:321057762782:web:d702d5520eeda7a8c1814f",
  
    measurementId: "G-9NBEG9HF9Q"
  


};

firebase.initializeApp(firebaseConfig)



const app = createApp(App)

app.mount('#app')


// admin@trustLine*1