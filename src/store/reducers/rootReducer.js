import authReducer from './authReducer';
import setsReducer from './setsReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';


const rootReducer = combineReducers({
  auth: authReducer,
  sets: setsReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
