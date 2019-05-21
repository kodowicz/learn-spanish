import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
  apiKey: "AIzaSyBEfywmfV8wPU6MJcHmXdTfEb5UAYl-3-I",
  authDomain: "flashcards-2e00e.firebaseapp.com",
  databaseURL: "https://flashcards-2e00e.firebaseio.com",
  projectId: "flashcards-2e00e",
  storageBucket: "flashcards-2e00e.appspot.com",
  messagingSenderId: "80361488536",
  appId: "1:80361488536:web:f40d81b1295963d0"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase
