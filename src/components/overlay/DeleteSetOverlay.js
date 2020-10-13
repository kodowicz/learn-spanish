import React from 'react';
import { Redirect } from 'react-router-dom';

import styled from 'styled-components';
import { Button, colors } from '../../assets/styles/GlobalStyles';


class DeleteSetOverlay extends React.Component {
  state = {
    isDeleted: false
  }

  handleDecline = event => {
    this.props.askForDeleting(false);
  }

  handleDelete = event => {
    this.props.askForDeleting(false);
    this.props.deleteSet();

    if (this.props.isEdited) {
      this.props.deleteSetChanges();
    }

    this.setState({
      isDeleted: true
    })
  }

  render() {
    if (this.state.isDeleted) return <Redirect to="/" />;

    return (
      <Background>
        <Dialog role="alertdialog" aria-describedby="info">
          <Alert id="info">Are you sure you want to delete this set? The action will be irreversible.</Alert>
          <Buttons>
            <Button
              color={colors.navy}
              center="true"
              onClick={this.handleDecline}>
              go back
            </Button>
            <Button
              color={colors.warming}
              center="true"
              onClick={this.handleDelete}>
              delete
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
  width: 25rem;
  height: 30rem;
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

export default DeleteSetOverlay
