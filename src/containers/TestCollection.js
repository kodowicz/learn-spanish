import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { changeLocation } from '../store/actions/locationActions';
import { basicTwoTerms, updateTerm, addNewTerm, removeTerm, submitSet } from '../store/actions/testCollection';
import Test from '../components/dashboard/Test';

const TestCollection = (props) => (
  <Test
    title="collection"
    terms={props.terms}
    isTermAdded={props.isTermAdded}
    isNewTerm={props.isNewTerm}
    basicTwoTerms={props.basicTwoTerms}
    updateTerm={props.updateTerm}
    addNewTerm={props.addNewTerm}
    removeTerm={props.removeTerm}
    submitSet={props.submitSet}
    changeLocation={props.changeLocation}
  />
);

const mapStateToProps = state => ({
  terms: state.firestore.ordered.collection,
  isTermAdded: state.isTermAdded,
  isNewTerm: state.isNewTerm,
})

export default compose(
  connect(
    mapStateToProps,
    {
      basicTwoTerms,
      updateTerm,
      addNewTerm,
      removeTerm,
      submitSet,
      changeLocation
    }
  ),
  firestoreConnect([
    {
      collection: 'collection',
      storeAs: 'collection',
      orderBy: ["time"]
    }
  ])
)(TestCollection);
