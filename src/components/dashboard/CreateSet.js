import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLocation, changeLastLocation } from '../../store/actions/locationActions';

// import styled from 'styled-components';



class CreateSet extends Component {
  componentDidMount() {
    this.props.changeLocation('create');
    this.props.changeLastLocation("/");
  }

  render() {
    return (
      <div>
        <h1>create set</h1>
        <p>Name:</p>

        <ul>
          <Term />
          <Term />
        </ul>

        <button>
        </button>
      </div>
    )
  }
}

const Term = () => (
  <div>
    <input />
    <input />
  </div>
)

const mapStateToProps = state => ({
  location: state.location,
  lastLocation: state.lastLocation
})


export default connect(
  mapStateToProps,
  { changeLocation, changeLastLocation }
)(CreateSet);
