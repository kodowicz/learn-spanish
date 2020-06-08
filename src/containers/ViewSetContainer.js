import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { chooseMethod } from '../store/actions/overlayActions';
import { createLearnSet } from '../store/actions/learnSetActions';
import { createPlaySet } from '../store/actions/playSetActions';
import { removeNewKey } from '../store/actions/createSetActions';
import { deleteSetChanges } from '../store/actions/editSetActions';
import { sortTerms } from '../store/actions/setActions';
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
      sortedBy={props.sortedBy}
      terms={props.terms}
      lastLocation={props.lastLocation}
      isEditSubmited={props.isEditSubmited}
      isOverlayOpen={props.isOverlayOpen}
      changeLocation={props.changeLocation}
      changeLastLocation={props.changeLastLocation}
      setCurrentSetId={props.setCurrentSetId}
      sortTerms={props.sortTerms}
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

const mapStateToProps = (state, ownProps) => {
  const setDetails = state.firestore.data.setDetails;
  const author = setDetails ? setDetails.authorId : null;
  const terms = state.firestore.ordered.terms;
  const userProgress = state.firestore.data.userProgress;
  const knowledge = userProgress && userProgress.knowledge;
  const amount = userProgress && userProgress.amount;
  const percentage = userProgress ? Math.floor((knowledge * 100) / (amount * 5)) : undefined;

  return {
    percentage,
    terms,
    author,
    setDetails,
    sortedBy: state.sortedBy,
    signedUser: state.firebase.auth.uid,
    lastLocation: state.lastLocation,
    isEditSubmited: state.isEditSubmited,
    isOverlayOpen: state.isOverlayOpen.isChosen,
    isLoaded: userProgress ?
      isLoaded(
        terms,
        setDetails
      )
      :
      isLoaded(
        terms,
        setDetails,
        userProgress
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
      sortTerms,
      chooseMethod,
      createLearnSet,
      createPlaySet,
      enableEditSet,
      deleteSetChanges
    }
  ),
  firestoreConnect(props => {
    const sortedBy = props.sortedBy ? 'term' : 'time';

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
        orderBy: [sortedBy]
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
