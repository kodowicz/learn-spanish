import React, { Component } from 'react';

class ChooseBetweenTwo extends Component {
  state = {
    isChosen: false,
    options: []
  }

  componentDidMount() {
    this.createGame();
  }

  shuffleOptions = (array) => {
    let counter = array.length - 1;
    let newOrder = [...array];

    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      let temp = newOrder[counter];
      newOrder[counter] = newOrder[index];
      newOrder[index] = temp;
      counter--;
    }

    return newOrder;
  }

  createGame() {
    this.setState((prevState, props) => {
      const { item, terms } = props;
      let options = [item.id];

      while (options.length < 2) {
        const index = Math.floor(Math.random() * terms.length);
        const id = terms[index].id;
        const isTaken = options.some(element => element === id)
        if (!isTaken) {
          options.push(id)
        }
      }

      return {
        options: this.shuffleOptions(options)
      }
    })
  }

  handleChosenAnswer = (answer) => {
    this.setState({
      isChosen: true
    }, () => {

      const { item, chooseOption } = this.props;
      const correctAnswer = item.id;

      if (answer === correctAnswer) {
        chooseOption(item, true);
      } else {
        chooseOption(item, false);
      }
    })
  }

  render() {
    const { item, terms } = this.props;
    const { isChosen, options } = this.state;

    return (
      <div style={{display: `${isChosen ? 'none': 'block'}`, padding: '100px 20px'}}>
        <h2>{item.term}</h2>
        {options.map(termid => {
          const index = terms.findIndex(element => element.id === termid);
          return (
            <p
              key={termid}
              onClick={() => this.handleChosenAnswer(termid)}
            >
              {terms[index].definition}
            </p>
          )
        })}
      </div>
    )
  }
}

export default ChooseBetweenTwo
