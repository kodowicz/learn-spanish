import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { changeLocation, changeLastLocation, currentSetId } from '../store/actions/locationActions';
import { shuffleCard, throwoutCard } from '../store/actions/learnSetActions';
import LearnSet from '../components/dashboard/LearnSet';


const LearnSetContainer = (props) => (
  <LearnSet
    match={props.match}
    terms={props.terms}
    shuffled={props.shuffled}
    changeLocation={props.changeLocation}
    changeLastLocation={props.changeLastLocation}
    currentSetId={props.currentSetId}
    shuffleCard={props.shuffleCard}
    throwoutCard={props.throwoutCard}
  />
);


const renderCards = (terms) => {
  if (terms) {
    let layerIndex = 1;
    let visibleCards = terms.map(term => {
      layerIndex -= 1;

      return Object.assign({}, term, { layerIndex: layerIndex })
    });

    return visibleCards
  }
}

const mapStateToProps = state => ({
  uid: state.firebase.auth.uid,
  shuffled: state.shuffled,
  location: state.location,
  lastLocation: state.lastLocation,
  terms: renderCards(state.firestore.ordered.terms)
})

export default compose(
  connect(
    mapStateToProps,
    { changeLocation, changeLastLocation, currentSetId, shuffleCard, throwoutCard }
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
      storeAs: 'terms',
      orderBy: ["time"]
    }
  ])
)(LearnSetContainer)
