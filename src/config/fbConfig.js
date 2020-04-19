import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
  /* firebase configuration */
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase
