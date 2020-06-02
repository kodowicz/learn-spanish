import React, { Component } from 'react';

class TypeMeaning extends Component {
  state = {
    isChosen: false,
    value: "",
    correctAnswer: ""
  }

  componentDidMount() {
    this.createGame();
  }

  createGame() {
    this.setState({
      correctAnswer: this.props.item.term
    })
  }

  handleTyping = (event) => {
    const value = event.target.value;
    this.setState({
      value
    })
  }

  handleCheck = () => {
    this.setState({
      isChosen: true
    }, () => {
      const { item, chooseOption } = this.props;
      const { value, correctAnswer } = this.state;
      const answer = value.trim();

      if (answer === correctAnswer) {
        chooseOption(item, true);
      } else {
        chooseOption(item, false);
      }
    })
  }

  render() {
    const { isChosen, value } = this.state;
    const { item } = this.props;

    return (
      <div style={{display: `${isChosen ? 'none': 'block'}`, padding: '100px 20px'}}>
        <h2>{item.definition}</h2>
        <input
          value={value}
          onChange={this.handleTyping}
        />
        <button type='submit' onClick={this.handleCheck}>check</button>
      </div>
    )
  }
}

export default TypeMeaning
