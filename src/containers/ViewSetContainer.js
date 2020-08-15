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
import { createEditSet } from '../store/actions/editSetActions';
import {
  changeLocation,
  changeLastLocation,
  setCurrentSetId,
  enableEditSet
} from '../store/actions/navigationActions';

import ViewSet from '../pages/ViewSet';


const ViewSetContainer = (props) => {
  return props.isLoaded ?
    <ViewSet
      match={props.match}
      setDetails={props.setDetails}
      signedUser={props.signedUser}
      author={props.author}
      percentage={props.percentage}
      isUserSet={props.isUserSet}
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
      createEditSet={props.createEditSet}
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
  const terms = state.firestore.ordered.viewTerms;
  const userProgress = state.firestore.data.userProgress;
  const knowledge = userProgress?.knowledge;
  const amount = userProgress?.amount;
  const isUserSet = userProgress ? true : false;
  const percentage = userProgress ?
    knowledge ?
      Math.round((knowledge * 100) / (amount * 5))
      :
      0
    :
    undefined;
  
  return {
    percentage,
    terms,
    author,
    setDetails,
    isUserSet,
    sortedBy: state.sortedBy,
    signedUser: state.firebase.auth.uid,
    lastLocation: state.navigation.lastLocation,
    isEditSubmited: state.isEditSubmited,
    isOverlayOpen: state.isOverlayOpen.isChosen,
    isLoaded: userProgress ?
      isLoaded(
        terms,
        setDetails,
        userProgress
      )
      :
      isLoaded(
        terms,
        setDetails
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
      createEditSet,
      chooseMethod,
      createLearnSet,
      createPlaySet,
      enableEditSet,
      deleteSetChanges
    }
  ),
  firestoreConnect(props => {
    const sortedBy = props.sortedBy ? 'term' : 'time';

    if (props.signedUser) {
      if (props.isUserSet) {
        return [
          {
            collection: 'sets',
            doc: props.match.params.id,
            storeAs: 'setDetails'
          },
          {
            collection: 'users',
            doc: props.signedUser,
            subcollections: [
              {
                collection: 'learn',
                doc: props.match.params.id,
                subcollections: [{ collection: 'game' }]
              }
            ],
            storeAs: 'viewTerms',
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
      } else {
        return [
          {
            collection: 'sets',
            doc: props.match.params.id,
            storeAs: 'setDetails'
          },
          {
            collection: 'sets',
            doc: props.match.params.id,
            subcollections: [{ collection: 'terms' }],
            storeAs: 'viewTerms',
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
      }
    } else {
      return [
        {
          collection: 'sets',
          doc: props.match.params.id,
          storeAs: 'setDetails'
        },
        {
          collection: 'sets',
          doc: props.match.params.id,
          subcollections: [{ collection: 'terms' }],
          storeAs: 'viewTerms',
          orderBy: ["time"]
        }
      ]
    }
  })
)(ViewSetContainer);
