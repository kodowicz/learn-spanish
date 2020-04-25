import React from 'react';

class Password extends React.Component {
  handleDecline = event => {
    // close overlay
  }

  handleDelete = event => {
    // this.props.deleteSet()
  }

  render() {
    return (
      <div role="alertdialog" aria-describedby="info">
        <p id="info">Are you sure you want to delete this set? The action will be irreversible.</p>
        <button onClick={this.handleDecline} type="button">no</button>
        <button onClick={this.handleDelete} type="button">yes</button>
      </div>
    );
  }
}

export default Password
