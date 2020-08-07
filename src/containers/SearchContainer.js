import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { searchForSets } from '../store/actions/searchActions';
import {
  changeLocation,
  changeLastLocation
} from '../store/actions/navigationActions';

import Search from '../pages/Search';


const SearchContainer = (props) => (
  <Search
    value={props.value}
    searchedSets={props.searchedSets}
    changeLocation={props.changeLocation}
    changeLastLocation={props.changeLastLocation}
    searchForSets={props.searchForSets}
  />
);

const mapStateToProps = (state) => {
  const allSets = state.firestore.ordered.allSets;
  const value = state.search;
  const searchedSets = (allSets && value) &&
    allSets.filter(
      set => set.name.includes(value)
    );

  return {
    value,
    searchedSets
  }
}

export default compose(
  connect(
    mapStateToProps,
    {
      searchForSets,
      changeLocation,
      changeLastLocation,
    }
  ),
  firestoreConnect(props => [{
    collection: 'sets',
    storeAs: 'allSets'
  }])
)(SearchContainer);
