import React from 'react';

class StopLearningOverlay extends React.Component {
  handleKeepLearning = event => {
    // close overlay
  }

  handleStopLearning = event => {
    // this.props.stopLearning()
  }

  render() {
    return (
      <div role="alertdialog" aria-describedby="info">
        <p id="info">Are you sure you want to finish learning?</p>
        <button onClick={this.handleKeepLearning} type="button">no</button>
        <button onClick={this.handleStopLearning} type="button">yes</button>
      </div>
    );
  }
}

export default StopLearningOverlay
