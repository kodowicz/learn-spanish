import React from 'react';

class Password extends React.Component {
  state = {
    password: ""
  }

  handleChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <form aria-labelledby="change-password" onSubmit={this.handleSubmit}>
        <fieldset>
          <legend id="change-password">Change your password</legend>
          <div>
            <label htmlFor="password">password</label>
            <input onChange={this.handleChange} id="password" type="password" size="15" />
          </div>
          <button type="submit">change</button>
        </fieldset>
      </form>
    );
  }
}

// every overlay - manage ref: https://pl.reactjs.org/docs/accessibility.html#programmatically-managing-focus
export default Password
