import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { changeLocation } from '../store/actions/locationActions';
import { basicTwoTerms, updateTerm, addNewTerm, removeTerm, submitSet } from '../store/actions/testSubcollection';
import Test from '../components/dashboard/Test';

const TestSubcollection = (props) => (
  <Test
    title="subcollection"
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

const mapStateToProps = state => {
  console.log(state.firestore.ordered);
  return({
    terms: state.firestore.ordered.subcollection,
    isTermAdded: state.isTermAdded,
    isNewTerm: state.isNewTerm,
  })
}

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
      collection: 'subcollection',
      doc: '7Wlu4hMX2ILQPLHHZ9Js',
      subcollections: [{ collection: 'sets' }],
      storeAs: 'subcollection',
      orderBy: ["time"]
    }
  ])
)(TestSubcollection);
