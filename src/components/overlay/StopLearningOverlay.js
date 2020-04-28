import React from 'react';
import { Link } from 'react-router-dom';


class StopLearningOverlay extends React.Component {
  handleKeepLearning = event => {
    this.props.cancelSesion(false)
  }

  handleStopLearning = event => {
    this.props.cancelSesion(false)
  }

  render() {
    return (
      <div role="alertdialog" aria-describedby="info">
        <p id="info">Are you sure you want to finish learning?</p>
        <button onClick={this.handleKeepLearning} type="button">no</button>
        <Link to={`/sets/${this.props.setid}`} onClick={this.handleStopLearning} type="button">yes</Link>
      </div>
    );
  }
}

export default StopLearningOverlay
