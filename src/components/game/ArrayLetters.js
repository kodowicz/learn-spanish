import React, { Component } from 'react';

class ArrayLetters extends Component {
  state = {
    isChosen: false,
    counter: 0,
    answer: [],
    index: 0,
    letters: [],
  }

  componentDidMount() {
    this.createGame();
  }

  createGame() {
    this.setState((prevState, props) => {
      const { item } = this.props;
      const { index } = this.state;
      const correctAnswer = item.term;
      let letters = this.randomLetters(item.term, index);
      letters = this.shuffleOptions(letters);

      return {
        letters,
        correctAnswer
      }
    })
  }

  randomLetters = (word, index) => {
    const letter = word[index];
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'w', 'z'];
    let letters = [letter];

    while (letters.length < 5) {
      const index = Math.floor(Math.random() * alphabet.length);
      const isTaken = letters.some(letter => letter === alphabet[index]);

      if (!isTaken) {
        letters.push(alphabet[index])
      }
    }

    return letters
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
    const choice = event.target.id;

    this.setState((prevState, props) => {
      const correctLetter = prevState.correctAnswer[prevState.index];
      let nextIndex = prevState.index + 1;
      let answer = prevState.answer;


      if (choice === correctLetter) {
        const nextLetter = prevState.correctAnswer[nextIndex];

        // we don't want to choose space
        if (nextLetter === " ") {
          nextIndex = prevState.index + 2;
          answer.push(choice, nextLetter)

        } else if (nextLetter) {
          answer.push(choice)

        // finished game
        } else {
          return ({
            isChosen: true
          })
        }

        let letters = this.randomLetters(prevState.correctAnswer, nextIndex);
        letters = this.shuffleOptions(letters);

        return({
          index: nextIndex,
          letters,
          answer
        })

      } else {
        alert('wrong');
        let counter = prevState.counter + 1;

        // game over
        if (counter >= 3) {
          props.chooseOption(props.item, false)

          return ({
            isChosen: true,
            counter
          })

        } else {
          return({
            counter
          })
        }
      }

    }, () => {
      const { counter } = this.state;
      const { item, chooseOption} = this.props;

      if (counter === 3) {
        chooseOption(item, false)

      } else if (this.state.isChosen) {
        chooseOption(item, true)
      }
    })
  }

  render() {
    const { isChosen, letters, answer } = this.state;
    const { item } = this.props;

    return (
      <div style={{display: `${isChosen ? 'none': 'block'}`, padding: '100px 20px'}}>
        <h2>{item.definition}</h2>

        <div>
          {letters.map((letter, index) => {
            return (
              <p
                id={letter}
                key={index}
                onClick={this.handlePicking}
                >
                {letter}
              </p>
            )
          })}
        </div>

        <p>{answer.join("")}</p>
      </div>
    )
  }
};

export default ArrayLetters
