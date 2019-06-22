import { authReducer } from './authReducer';
import { createdSetReducer, isSubmitedEditReducer, setDeletedReducer } from './setsReducer';
import { locationReducer, lastLocationReducer, setIdReducer } from './locationReducer';
import { shuffleCardReducer } from './learnSetReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';


const rootReducer = combineReducers({
  auth: authReducer,
  setId: setIdReducer,
  newSetKey: createdSetReducer,
  isEditSubmited: isSubmitedEditReducer,
  isSetDeleted: setDeletedReducer,
  terms: shuffleCardReducer,
  location: locationReducer,
  lastLocation: lastLocationReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
