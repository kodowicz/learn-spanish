import React, { Component } from 'react';

class SelectFalseOrTrue extends Component {
  state = {
    isChosen: false,
    comparisonItem: {}
  }

  componentDidMount() {
    this.createGame();
  }

  createGame() {
    this.setState((prevState, props) => {
      const { item, terms } = props;
      const isEqual = Math.random() > 0.5 ? true : false;
      let comparisonItem;

      if (isEqual) {
        comparisonItem = item;
      } else {
        const index = Math.floor(Math.random() * terms.length);
        comparisonItem = terms[index];
      }

      return { comparisonItem }
    })
  }

  handleChosenAnswer = (answer) => {
    this.setState({
      isChosen: true
    }, () => {
      const { item, chooseOption } = this.props;
      const { comparisonItem } = this.state;
      const correctAnswer = item.id === comparisonItem.id;

      if (answer === correctAnswer) {
        chooseOption(item, true);
      } else {
        chooseOption(item, false);
      }
    })
  }

  render() {
    const { isChosen, comparisonItem } = this.state;
    const { item } = this.props;

    return (
      <div style={{display: `${isChosen ? 'none': 'block'}`, padding: '100px 20px'}}>
        <h2>{item.term}</h2>
        <h3>{comparisonItem.definition}</h3>
        <button onClick={() => this.handleChosenAnswer(false)}>false</button>
        <button onClick={() => this.handleChosenAnswer(true)}>true</button>
      </div>
    )
  }
}


export default SelectFalseOrTrue
