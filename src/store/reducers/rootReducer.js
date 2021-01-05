import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import { gameAnswerReducer } from "./playSetReducers";
import { overlayReducer } from "./overlayReducers";
import { navigationReducer } from "./navigationReducers";
import { notificationReducer } from "./notificationReducers";
import { setStatusReducer, searchReducer } from "./setsReducers";

const rootReducer = combineReducers({
  setStatus: setStatusReducer,
  isOverlayOpen: overlayReducer,
  navigation: navigationReducer,
  notification: notificationReducer,
  search: searchReducer,
  gameAnswer: gameAnswerReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
