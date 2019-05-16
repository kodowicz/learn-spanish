import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLocation, changeLastLocation } from '../../store/actions/locationActions';
// import styled from 'styled-components';



class LearnSet extends Component {
  componentDidMount() {
    this.props.changeLocation('learn');
    const setId = this.props.match.params.id;
    this.props.changeLastLocation(`/sets/${setId}`);
  }

  render() {
    return (
      <div>
        <button onClick={this.props.history.goBack}>click</button>
      </div>
    )
  }
}


const mapStateToProps = state => {

  return ({
    location: state.location,
    lastLocation: state.lastLocation
  })
}

export default connect(
  mapStateToProps,
  { changeLocation, changeLastLocation }
)(LearnSet);
