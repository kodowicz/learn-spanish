import React, { Component } from "react";
import styled, { css } from "styled-components";
import { colors, fonts } from "../../assets/styles/GlobalStyles";
import { flipOut, flipIn } from "../../assets/styles/GlobalKeyframes";

class SelectFalseOrTrue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChosen: false,
      answer: "",
      term: "",
      comparisonItem: {}
    };

    this.handleChosenAnswer = this.handleChosenAnswer.bind(this);
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
  }

  componentDidMount() {
    this.createGame();
  }

  createGame() {
    this.setState((prevState, props) => {
      const { item, terms } = props;
      const term = item.term;
      const isEqual = Math.random() > 0.5 ? true : false;
      let comparisonItem;

      if (isEqual) {
        comparisonItem = item;

      } else {
        const index = Math.floor(Math.random() * terms.length);
        comparisonItem = terms[index];
      }

      return {
        term,
        comparisonItem
      };
    });
  }

  handleChosenAnswer(event) {
    const answer = event.target.id;
    this.setState({
      answer,
      isChosen: true
    });
  }

  handleAnimationEnd(event) {
    if (event.animationName === flipOut.name) {
      const { item, showGameAnswer } = this.props;
      const { answer, comparisonItem } = this.state;
      const correctAnswer = item.id === comparisonItem.id;
      const userAnswer = answer === "correct" ? true : false;

      if (userAnswer === correctAnswer) {
        showGameAnswer(item, "correct");
      } else {
        showGameAnswer(item, "wrong");
      }
    }
  }

  render() {
    const { term, isChosen, comparisonItem } = this.state;

    return (
      <GameWrapper>
        <Question isChosen={isChosen} onAnimationEnd={this.handleAnimationEnd}>
          <Term>{term}</Term>
          <Definition>{comparisonItem.definition}</Definition>
        </Question>

        <ButtonsWrapper>
          <Button id="wrong" onClick={this.handleChosenAnswer}>
            false
          </Button>
          <Button id="correct" onClick={this.handleChosenAnswer}>
            true
          </Button>
        </ButtonsWrapper>
      </GameWrapper>
    );
  }
}

const GameWrapper = styled.div`
  padding-top: 20vh;
  width: 70vw;
  max-width: 30rem;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 30rem;
  }
`;

const Question = styled.div`
  ${({ isChosen }) =>
    isChosen
      ? css`
          animation: ${flipOut} 0.5s linear forwards;
        `
      : css`
          animation: ${flipIn} 0.5s linear;
        `};

  background: ${colors.translucentNavy};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: max-content;
  min-height: 50vh;
  width: 100%;
  max-width: 80vw;
  margin: 0 auto;
  border-radius: 4rem;
  padding: 2rem;
`;

const Term = styled.p`
  font-size: 3rem;
  margin: 0;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Definition = styled.p`
  color: ${colors.lightGray};
  font-size: 2.2rem;
  margin: 0;
  text-align: center;
`;

const ButtonsWrapper = styled.div`
  margin: 4rem auto 6rem auto;
  display: flex;
  justify-content: space-between;
  width: 60vw;
  max-width: 30rem;
`;

const Button = styled.button`
  color: ${colors.white};
  border: 1px solid ${colors.white};
  font-family: ${fonts.family};
  display: block;
  width: 10rem;
  height: 4rem;
  margin: 0;
  text-align: center;
  font-size: 1.4rem;
  background: transparent;
  border-radius: 50px;
  transition: transform 0.2s;

  &:focus,
  &:active {
    background: ${colors.shadow};
    transform: translateY(2px);
  }

  @media (min-width: 768px) {
    width: 13rem;
  }
`;

export default SelectFalseOrTrue;
