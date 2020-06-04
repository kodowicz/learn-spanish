import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { chooseMethod } from '../store/actions/overlayActions';
import { createLearnSet } from '../store/actions/learnSetActions';
import { createPlaySet } from '../store/actions/playSetActions';
import { removeNewKey } from '../store/actions/createSetActions';
import { deleteSetChanges } from '../store/actions/editSetActions';
import {
  changeLocation,
  changeLastLocation,
  setCurrentSetId,
  enableEditSet
} from '../store/actions/locationActions';

import ViewSet from '../pages/ViewSet';


const ViewSetContainer = (props) => {
  return props.isLoaded ?
    <ViewSet
      match={props.match}
      setDetails={props.setDetails}
      signedUser={props.signedUser}
      author={props.author}
      percentage={props.percentage}
      terms={props.terms}
      lastLocation={props.lastLocation}
      isEditSubmited={props.isEditSubmited}
      isOverlayOpen={props.isOverlayOpen}
      changeLocation={props.changeLocation}
      changeLastLocation={props.changeLastLocation}
      setCurrentSetId={props.setCurrentSetId}
      deleteSetChanges={props.deleteSetChanges}
      removeNewKey={props.removeNewKey}
      chooseMethod={props.chooseMethod}
      createLearnSet={props.createLearnSet}
      createPlaySet={props.createPlaySet}
      enableEditSet={props.enableEditSet}
    />
    :
    <></>
}

const mapStateToProps = (state) => {
  const setDetails = state.firestore.data.setDetails;
  const author = setDetails ? setDetails.authorId : null;
  const terms = state.firestore.ordered.terms;
  const userProgress = state.firestore.data.userProgress;
  const knowledge = userProgress && userProgress.knowledge;
  const amount = userProgress && userProgress.amount;
  const percentage = Math.floor((knowledge * 100) / (amount * 5));

  return {
    percentage,
    terms,
    author,
    setDetails,
    signedUser: state.firebase.auth.uid,
    lastLocation: state.lastLocation,
    isEditSubmited: state.isEditSubmited,
    isOverlayOpen: state.isOverlayOpen.isChosen,
    isLoaded: isLoaded(                         // doesn't word properly when updating
      state.firestore.data.terms,
      state.firestore.data.setDetails,
      // state.firestore.data.userProgress
    )
  }
}

export default compose(
  connect(
    mapStateToProps,
    {
      removeNewKey,
      changeLocation,
      changeLastLocation,
      setCurrentSetId,
      chooseMethod,
      createLearnSet,
      createPlaySet,
      enableEditSet,
      deleteSetChanges
    }
  ),
  firestoreConnect(props => {
    return props.signedUser ? [
      {
        collection: 'sets',
        doc: props.match.params.id,
        storeAs: 'setDetails'
      },
      {
        collection: 'sets',
        doc: props.match.params.id,
        subcollections: [{ collection: 'terms' }],
        storeAs: 'terms',
        orderBy: ["time"]
      },
      {
        collection: 'users',
        doc: props.signedUser,
        subcollections: [
          {
            collection: 'learn',
            doc: props.match.params.id
          }
        ],
        storeAs: 'userProgress'
      }
    ]
  :
    [
      {
        collection: 'sets',
        doc: props.match.params.id,
        storeAs: 'setDetails'
      },
      {
        collection: 'sets',
        doc: props.match.params.id,
        subcollections: [{ collection: 'terms' }],
        storeAs: 'terms',
        orderBy: ["time"]
      }
    ]
})
)(ViewSetContainer);
