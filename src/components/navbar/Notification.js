import React from 'react';
import styled from 'styled-components';
import { BlockElement, BasicInput, colors } from '../../assets/styles/GlobalStyles';


class Notification extends React.Component {
  componentDidMount() {
    const { message, removeNotification } = this.props;

    this.interval = setTimeout(
      () => {
        if (message) removeNotification()
      }, 3000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Wrapper>
        <Message>{this.props.message}</Message>
      </Wrapper>
    );
  }
};


const Wrapper = styled.div`
  position: absolute;
  top: 3.5em;
  left: 50%;
  width: 80vw;
  max-width: 300px;
  background: white;
  border-radius: 10px;
  transform: translateX(-50%);
  z-index: 3
`;

const Message = styled.p`
  color: ${colors.blue};
  text-align: center;
  margin: 1.6rem
`;

export default Notification
