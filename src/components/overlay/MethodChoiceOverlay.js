import React from 'react';
import { Redirect } from 'react-router-dom';

import styled from 'styled-components';
import { Button, colors } from '../../assets/styles/GlobalStyles';


class MethodChoiceOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenMethod: ''
    };

    this.bgRef = React.createRef();
  }

  handleCancel = (event) => {
    const node = this.bgRef.current;

    if (node === event.target) {
      this.props.chooseMethod(false);
    }
  }

  handleLearnChoice = () => {
    this.setState({
      chosenMethod: 'learn'
    }, () => {
      this.props.createLearnSet(this.props.setid)
    })
  }

  handlePlayChoice = () => {
    this.setState({
      chosenMethod: 'play'
    }, () => {
      this.props.createPlaySet(this.props.setid)
    })
  }

  componentWillUnmount() {
    this.props.chooseMethod(false);
  }

  render() {
    const { chosenMethod } = this.state;
    const { setid, signedUser } = this.props;

    if (!signedUser) {
      return <Redirect to='/signup' />

    } else if (chosenMethod === 'learn') {
      return <Redirect to={`/learn/${setid}`} />

    } else if (chosenMethod === 'play') {
      return <Redirect to={`/play/${setid}`} />

    } else {
      return (
        <Background
          ref={this.bgRef}
          onClick={this.handleCancel}
        >
          <Dialog role="alertdialog" aria-describedby="info">
            <Alert id="info">Do you want to learn words by flashcards or by game?</Alert>
            <Buttons>
              <Button
                color={colors.navy}
                center="true"
                onClick={this.handleLearnChoice}
              >
                flashcards
              </Button>
              <Button
                color={colors.navy}
                center="true"
                onClick={this.handlePlayChoice}
              >
                game
              </Button>
            </Buttons>
          </Dialog>
        </Background>
      )
    }
  }
};


const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
`;

const Dialog = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 250px;
  height: 300px;
  background: ${colors.white};
  color: ${colors.navy};
  border-radius: 15px;
  box-shadow: 10px 10px 20px ${colors.shadow};
  transform: translate(-50%, -50%);
`;

const Alert = styled.p`
  font-size: 1.6rem;
  margin: 3rem;
  text-align: center;
  user-select: none;
`;

const Buttons = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between
`;


export default MethodChoiceOverlay
