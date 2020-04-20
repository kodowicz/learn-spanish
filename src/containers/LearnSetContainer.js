import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { changeLocation, changeLastLocation, currentSetId } from '../store/actions/locationActions';
import { createLearnSet, shuffleCard, throwoutCard,  } from '../store/actions/learnSetActions';
import LearnSet from '../components/dashboard/LearnSet';


const LearnSetContainer = (props) => (
  <>
    { props.terms &&
      <LearnSet
        setID={props.setID}
        terms={props.terms}
        changeLocation={props.changeLocation}
        changeLastLocation={props.changeLastLocation}
        currentSetId={props.currentSetId}
        shuffleCard={props.shuffleCard}
        throwoutCard={props.throwoutCard}
        createLearnSet={props.createLearnSet}
      />
    }
  </>
);


const layerCards = (terms) => {
  let layerIndex = 1;

  return terms.map(term => {
    layerIndex -= 1;
    return {
      ...term,
      layerIndex
    }
  })
}

const mapStateToProps = (state, ownProps) => {
  const terms = state.firestore.ordered.learnTerms;

  return {
    setID: ownProps.match.params.id,
    uid: state.firebase.auth.uid,
    location: state.location,
    lastLocation: state.lastLocation,
    terms: terms ? layerCards(terms) : undefined
  }
}

export default compose(
  connect(
    mapStateToProps,
    { changeLocation, changeLastLocation, currentSetId, shuffleCard, throwoutCard, createLearnSet }
  ),
  firestoreConnect(props => [
    {
      collection: 'users',
      doc: props.uid,
      subcollections: [{
        collection: 'learn',
        doc: props.match.params.id,
        subcollections: [{ collection: 'basic' }]
      }],
      storeAs: 'learnTerms',
      orderBy: ["time"]
    }
  ])
)(LearnSetContainer)
