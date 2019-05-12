import firebase from 'firebase'
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCtsRrykbbdWaFJYxbZAa_6Ik_VYO9LPFo",
    authDomain: "cogitatorcampaigns-2ab2f.firebaseapp.com",
    databaseURL: "https://cogitatorcampaigns-2ab2f.firebaseio.com",
    projectId: "cogitatorcampaigns-2ab2f",
    storageBucket: "cogitatorcampaigns-2ab2f.appspot.com",
    messagingSenderId: "714684264534",
    appId: "1:714684264534:web:fd612f957cdb6815"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig)
  // firebaseApp.firestore().settings({ timestampsInSnapshots: true})

  export default firebaseApp.firestore()