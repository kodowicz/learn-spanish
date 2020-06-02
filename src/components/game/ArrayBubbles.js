import React, { Component } from 'react';

class ArrayBubbles extends Component {
  state = {
    isChosen: false,
    bubbles: [],
    answer: []
  }

  componentDidMount() {
    this.createGame();
  }

  createGame() {
    this.setState((prevState, props) => {
      const { item } = props;
      const term = item.term;
      let bubbles = [];
      const isSingle = Math.random() > 0.5 ? true : false;
      const isLong = term.length < 10 ? true : false;

      // bubbles with single letter
      if (isSingle && isLong) {
        bubbles = term.split('');

      // bubbles with more than 1 letter
      } else {
        bubbles = this.createBubbles(term);
      }


      return {
        bubbles: this.shuffleOptions(bubbles)
      }
    })
  }

  createBubbles = (str) => {
    let index = 0;
    let chunkLength = [2, 3];
    let bubbles = [];

    while (index < str.length) {
      chunkLength.forEach(length => {
        let chunk = str.substring(index, index + length);

        if (chunk) {
          bubbles.push(chunk);
        }

        index += chunk.length
      });
    }

    return bubbles
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

  handlePicking = (event) => {
    const newBubble = event.target.id;

    this.setState((state, props) => {
      let { answer, bubbles: prevBubbles } = state;
      const index = prevBubbles.findIndex(element => element === newBubble);
      let bubbles = [
        ...prevBubbles.slice(0, index),
        ...prevBubbles.slice(index + 1)
      ];

      answer.push(newBubble);

      return {
        isChosen: bubbles.length ? false : true,
        answer,
        bubbles
      }

    }, () => {
      const { item, chooseOption } = this.props;
      const correctAnswer = item.term;
      const isFinished = this.state.bubbles.length ? false : true;
      const answer = this.state.answer.join("");

      // console.log(isFinished);
      if (isFinished) {
        if (answer === correctAnswer) {
          chooseOption(item, true);
        } else {
          chooseOption(item, false);
        }
      }
    })
  }

  render() {
    const { isChosen, bubbles, answer } = this.state;
    const { item } = this.props;

    return (
      <div style={{display: `${isChosen ? 'none': 'block'}`, padding: '100px 20px'}}>
        <h2>{item.definition}</h2>
        {bubbles.map((bubble, index) => {
          return (
            <p
              id={bubble}
              key={index}
              onClick={this.handlePicking}
            >
              {bubble}
            </p>
          )
        })}
        <div>
          <p>answer:</p>
          <p>
            {answer.map((letters, index) => <span key={index}>{letters}</span>)}
          </p>
        </div>
      </div>
    )
  }
}



export default ArrayBubbles
