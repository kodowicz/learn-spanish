import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import PlaySet from '../pages/PlaySet';

console.error("add play components");

const PlaySetContainer = (props) => <h1>Play</h1>;


const mapStateToProps = (state) => ({
  uid: state.firebase.auth.uid,
})

export default compose(
  connect(mapStateToProps, null),
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
)(PlaySetContainer)
