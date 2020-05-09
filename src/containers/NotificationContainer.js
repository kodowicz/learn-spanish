import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { removeNotification } from '../store/actions/notificationActions';

import Notification from '../components/navbar/Notification';


const NotificationContainer = (props) => {
  return (props.message) ?
    <Notification
      message={props.message}
      removeNotification={props.removeNotification}
     />
    :
    <></>
}

const mapStateToProps = (state) => {
  const userDetails = state.firestore.data.user;

  return {
    uid: state.firebase.auth.uid,
    message: userDetails && userDetails.notification
  }
}


export default compose(
  connect(
    mapStateToProps, { removeNotification }
  ),
  firestoreConnect(props => {
    return props.uid ?
    [
      {
        collection: 'users',
        doc: props.uid,
        storeAs: 'user'
      }
    ] : []
  })
)(NotificationContainer);
