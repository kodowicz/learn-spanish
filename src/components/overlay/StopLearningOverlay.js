import React from 'react';
import { Redirect } from 'react-router-dom';

import styled from 'styled-components';
import { Button, colors } from '../../assets/styles/GlobalStyles';


class StopLearningOverlay extends React.Component {
  state = {
    isCancelled: false
  }

  handleKeepLearning = event => {
    this.props.cancelSesion(false)
  }

  handleStopLearning = event => {
    this.setState({
      isCancelled: true
    }, () => this.props.cancelSesion(false))
  }

  render() {
    const { isCancelled } = this.state;
    const { setid } = this.props;

    if (isCancelled) return <Redirect to={`/sets/${setid}`} />;
    
    return (
      <Background>
        <Dialog role="alertdialog" aria-describedby="info">
          <Alert id="info">Are you sure you want to finish learning?</Alert>
          <Buttons>
            <Button
              color={colors.navy}
              center="true"
              onClick={this.handleKeepLearning}
            >
              no
            </Button>
            <Button
              color={colors.warming}
              center="true"
              onClick={this.handleStopLearning}
            >
              yes
            </Button>
          </Buttons>
        </Dialog>
      </Background>
    );
  }
}


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
`;

const Buttons = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between
`;


export default StopLearningOverlay
