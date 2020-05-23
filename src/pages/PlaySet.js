import React, { Component } from 'react';
import StopLearningOverlay from '../components/overlay/StopLearningOverlay';

import styled from 'styled-components';


class PlaySet extends Component {
  componentDidMount() {
    this.props.changeLocation('learn');
    this.props.changeLastLocation(`/sets/${this.props.setid}`);
  }

  componentWillMount() {
    this.props.setCurrentSetId(this.props.setid);
    this.props.createPlaySet(this.props.setid)
  }

  render() {
    const {
      setid,
      isOverlayOpen,
      cancelSesion
    } = this.props;

    if (isOverlayOpen) {
      return <StopLearningOverlay setid={setid} cancelSesion={cancelSesion} />

    } else {
      return (
        <h2>play set</h2>
      );
    }
  }
}

export default PlaySet
