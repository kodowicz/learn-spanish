import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { changeLocation, changeLastLocation, currentSetId } from '../store/actions/locationActions';
import { fetchTerms, shuffleCard, throwoutCard, createLearnSet } from '../store/actions/learnSetActions';
import LearnSet from '../components/dashboard/LearnSet';


const LearnSetContainer = (props) => (
  <>
    { props.fetchedTerms &&
      <LearnSet
        match={props.match}
        terms={props.terms}
        fetchedTerms={props.fetchedTerms}
        changeLocation={props.changeLocation}
        changeLastLocation={props.changeLastLocation}
        fetchTerms={props.fetchTerms}
        currentSetId={props.currentSetId}
        shuffleCard={props.shuffleCard}
        throwoutCard={props.throwoutCard}
        createLearnSet={props.createLearnSet}
      />
    }
  </>
);

const mapStateToProps = state => {
  console.log(state.firestore.ordered);
  return({
  uid: state.firebase.auth.uid,
  location: state.location,
  lastLocation: state.lastLocation,
  terms: state.terms,
  fetchedTerms: state.firestore.ordered.learnTerms
})}

export default compose(
  connect(
    mapStateToProps,
    { changeLocation, changeLastLocation, currentSetId, fetchTerms, shuffleCard, throwoutCard, createLearnSet }
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
