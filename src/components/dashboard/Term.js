import React, { Component } from 'react';
import styled from 'styled-components';

import { colors, fonts } from '../../assets/styles/GlobalStyles';
import remove from '../../assets/images/remove.svg';


class Term extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: "",
      definition: "",
      id: undefined,
      firstTouch: undefined,
      lastTouch: undefined,
      currentTouch: undefined,
      isBlockFocused: false,
      termFocused: false,
      definitionFocused: false,
      termLabelVisible: false,
      definitionLabelVisible: false,
      translation: 0,
      termRows: 1,
      definitionRows: 1,
      minRows: 1,
      lineHeight: 18
    }

    this.buttonRef = React.createRef()
  }

  componentDidMount () {
    const { definition, term, id, termRows, definitionRows } = this.props.termDetails;

    this.setState({
      id,
      termRows,
      definitionRows,
      term: /^\.\.\.$/g.test(term) ? '' : term,
      definition: /^\.\.\.$/g.test(definition) ? '' : definition,
      termLabelVisible: Boolean(term),
      definitionLabelVisible: Boolean(definition)
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isVisible !== this.props.isVisible) {
      this.setState({
        translation: 0
      })
    }
  }

  handleFocus = event => {
    const id = event.target.id;
    this.setState({
      [`${id}Focused`]: true,
      [`${id}LabelVisible`]: true
    })
  }

  handleBlur = event => {
    const hasValue = event.target.value ? true : false;
    const id = event.target.id;

    this.setState({
      [`${id}Focused`]: false,
      [`${id}LabelVisible`]: hasValue
    })
  }

  handleChange = event => {
    const rows = this.resizeTextarea(event, this.state);

    this.setState({
      [`${event.target.id}Rows`]: rows,
      [event.target.id]: event.target.value
    },
      () => this.props.updateTerm(this.state)
    );
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
      let translation = 0;

      translation = -(this.state.firstTouch - this.state.currentTouch);

      if (this.state.lastTouch > this.state.currentTouch) {
        this.props.onMove(true, this.props.element);

        if (translation <= -80) {
          translation = -80
        } else if (translation > 0) {
          translation = 0
        }

      } else if (this.state.lastTouch < this.state.currentTouch) {
        if (translation >= 0) {
          translation = 0
        } else if (translation < -80) {
          translation = -80
        }
      }

      this.setState({
        translation,
        lastTouch: currentTouch
      })
    })
  }

  handleTouchEnd = event => {
    if (this.state.translation < -40) {
      this.setState({
        translation: -80
      })
    } else {
      this.props.onMove(false, this.props.element);
      this.setState({
        translation: 0
      })
    }
  }

  handleBlockFocus = (event) => {
    const buttonRef = this.buttonRef;
    let isBlockFocused = true;

    if (event.type === 'blur' && event.relatedTarget !== buttonRef) {
      isBlockFocused = false
    }

    this.setState({ isBlockFocused });
  }

  removeElement = event => {
    event.preventDefault();
    this.props.removeTerm(this.state.id);
  }

  resizeTextarea = (event, state) => {
    const previousRows = event.target.rows;
		const { minRows, lineHeight } = state;
    event.target.rows = minRows;

    const currentRows = ~~(event.target.scrollHeight / lineHeight);

    if (currentRows === previousRows) {
    	event.target.rows = currentRows;
    }

    return currentRows
  }

  render() {
    const {
      term,
      definition,
      termRows,
      definitionRows,
      translation,
      isBlockFocused,
      termFocused,
      definitionFocused,
      termLabelVisible,
      definitionLabelVisible
    } = this.state;

    return (
      <Wrapper onBlur={this.handleBlockFocus} onFocus={this.handleBlockFocus}>
        <TermWrapper
          translation={translation}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
        >
          <DefineTerm>
            <Textarea
              id="term"
              lang="es"
              value={term}
              rows={termRows}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            <Label
              isVisible={termLabelVisible}
              htmlFor="term"
            >
              term
            </Label>
            <Border focused={termFocused} />
          </DefineTerm>
          <DefineTerm>
            <Textarea
              id="definition"
              value={definition}
              rows={definitionRows}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            <Label
              isVisible={definitionLabelVisible}
              htmlFor="definition"
            >
              definition
            </Label>
            <Border focused={definitionFocused} />
          </DefineTerm>
        </TermWrapper>
        <DeleteButton
          ref={this.buttonRef}
          isVisible={translation < -55 ? true : false}
          isFocused={isBlockFocused}
          onClick={this.removeElement}
        >
          <img src={remove} alt="remove" />
        </DeleteButton>
      </Wrapper>
    );
  }
}


const Wrapper = styled.div`
  display: grid;
  grid-template: 1fr / 1fr 80px;

  @media (min-width: 768px) {
    grid-template: 1fr / 10% 80% 10%;
    border-radius: 15px;
    background: ${colors.bluish};
  }
`;

const TermWrapper = styled.div`
  transform: ${props => `translateX(${props.translation}px)`};
  background: ${colors.bluish};
  border-radius: 15px;
  height: auto;
  padding: 2.2rem 0;
  display: grid;
  grid-template-columns: 80%;
  grid-template-rows: repeat(2, min-content);
  grid-row-gap: .5rem;
  place-content: center;
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  transition: transform 0.1s ease-out;

  @media (min-width: 768px) {
    grid-template-columns: 100%;
    grid-column: 2 / 3;
    background: none
  }
`;

const DefineTerm = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  display: ${(props) => props.isVisible && 'none'};
  font-size: ${(props) => props.htmlFor === 'term' ? '1.6rem' : '1.4rem'};
  color: ${colors.darkGray};
  position: absolute;
  bottom: -2px;
  left: 0;
  z-index: -1;
`;

const Textarea = styled.textarea`
  font-family: ${fonts.family};
  font-size: ${(props) => props.id === 'term' ? '1.6rem' : '1.4rem'};
  color: ${(props) => props.id === 'term' ? `${colors.white}` : `${colors.lightGray}`};
  background: none;
  line-height: 18px;
  border: none;
  width: 100%;
  outline: none;
  overflow: auto;
  height: auto;
  resize: none
`;

const Border = styled.div`
  background: ${props => props.focused && `${colors.white}`};
  width: 100%;
  height: 1px;
  position: absolute;
  bottom: -2px;
  left: 0;
`;

const DeleteButton = styled.button`
  display: ${ props => props.isVisible ? 'block' : 'none' };
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  background: none;
  border: none;
  padding: 0;
  width: 2.5rem;
  height: 2.5rem;
  place-self: center;

  @media (min-width: 768px) {
    grid-column: 3 / 4;
    display: block;
    opacity: ${ props => props.isFocused ? 1 : 0 };

    img {
      width: 2rem;
      height: 2rem;
    }
  }
`;


export default Term
