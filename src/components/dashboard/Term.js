import React, { Component } from 'react';
import styled from 'styled-components';

import { BlockShadow, BasicInput, colors } from '../../assets/styles/GlobalStyles';
import remove from '../../assets/images/remove.svg';

const Border = styled.div`
  width: 100%;
  height: 1px;
  background: ${colors.gray};
  position: absolute;
  bottom: ${props => props.isBig ? '0' : '10px'};
  left: 0;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template: 1fr / 1fr 80px
  margin: 25px 0;
`

const TermWrapper = styled(BlockShadow)`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  padding: 5px 20px 25px 20px;
  transition: transform 0.1s ease-out;
  transform: ${props => `translateX(${props.isMoved}px)`};
  background: white
`;

const DefineTerm = styled.div`
  position: relative;
  padding: 5px 0 10px 0;
`;

const Label = styled.label`
  position: absolute;
  bottom: -5px;
  left: 0;
  color: ${colors.gray};
  font-size: 10px;
  text-transform: uppercase;
`;

const Input = styled(BasicInput)`
  width: 100%;
  border: none;
  padding: 0px 0;
  outline-color: ${colors.blue}
`;

const DeleteButton = styled.button`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  background: none;
  border: none;
  padding: 0;
  display: ${ props => props.isMoved ? 'block' : 'none' }
`


class Term extends Component {
  state = {
    term: "",
    definition: "",
    id: null,
    firstTouch: null,
    lastTouch: null,
    currentTouch: null,
    isDeleted: false,
    isMoved: 0
  };

  componentDidMount () {
    if (this.props.termDetails) {
      const { definition, term, id } = this.props.termDetails;
      this.setState({
        term,
        definition,
        id
      })
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    }, () => this.props.updateTerm(this.state));
  }

  handleTouchStart = event => {
    this.setState({
      lastTouch: event.targetTouches[0].clientX,
      firstTouch: event.targetTouches[0].clientX
    })
  }

  handleTouchMove = event => {
    const currentTouch = event.targetTouches[0].clientX;

    this.setState(() => ({
      currentTouch
    }), () => {
      let isDeleted = null;
      let isMoved = 0;

      isMoved = -(this.state.firstTouch - this.state.currentTouch);

      if (this.state.lastTouch > this.state.currentTouch) {
        isDeleted = true;
        if (isMoved <= -80) {
          isMoved = -80
        } else if (isMoved > 0) {
          isMoved = 0
        }

      } else if (this.state.lastTouch < this.state.currentTouch) {
        isDeleted = false;
        if (isMoved >= 0) {
          isMoved = 0
          // TODO: moving back too fast
        } else if (isMoved < -80) {
          isMoved = -80
        }
      }

      this.setState({
        isDeleted,
        isMoved,
        lastTouch: currentTouch
      })
    })
  }

  handleTouchEnd = event => {
    if (this.state.isMoved < -40) {
      this.setState({
        isMoved: -80
      })
    } else {
      this.setState({
        isMoved: 0
      })
    }

    // if (this.state.isDeleted) {
    //   console.log('remove');
    // }
  }

  removeElement = event => {
    event.preventDefault();
    this.props.removeTerm(this.state.id);
  }

  render() {
    const { isMoved } = this.state;
    return (
      <Wrapper>
        <TermWrapper
          isMoved={isMoved}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
        >
          <DefineTerm>
            <Input
              autoFocus={this.props.focused ? true : false}
              id="term"
              tabIndex={this.props.index}
              value={this.state.term}
              onChange={this.handleChange}
            />
            <Label htmlFor="term">term</Label>
            <Border />
          </DefineTerm>
          <DefineTerm>
            <Input
              id="definition"
              tabIndex={this.props.index}
              value={this.state.definition}
              onChange={this.handleChange}
            />
            <Label htmlFor="definition">definition</Label>
            <Border />
          </DefineTerm>
        </TermWrapper>
        <DeleteButton
          isMoved={isMoved}
          onClick={this.removeElement}
        >
          <img src={remove} alt="remove" />
        </DeleteButton>
      </Wrapper>
    );
  }
}

export default Term
