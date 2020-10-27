import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { BasicTextArea, colors, fonts } from "../../assets/styles/GlobalStyles";
import remove from "../../assets/images/remove.svg";

const Term = ({
  element,
  termDetails,
  isVisible,
  onMove,
  removeTerm,
  updateTerm
}) => {
  const [id, setId] = useState(termDetails.id);
  const [state, setState] = useState({
    term: "",
    definition: ""
  });
  const [rows, setRows] = useState({
    termRows: termDetails.termRows,
    definitionRows: termDetails.definitionRows
  });
  const [focus, setFocus] = useState({
    termFocus: false,
    definitionFocus: false
  });
  const [label, setLabel] = useState({
    termLabel: false,
    definitionLabel: false
  });

  const [isBlockFocused, setIsBlockFocused] = useState(false);
  const [firstTouch, setFirstTouch] = useState(undefined);
  const [lastTouch, setLastTouch] = useState(undefined);
  const [currentTouch, setCurrentTouch] = useState(undefined);
  let [translation, setTranslation] = useState(0);

  const buttonRef = useRef();

  const minRows = 1;
  const lineHeight = 18;

  useEffect(() => {
    const definition = /^\.\.\.$/g.test(termDetails.definition)
      ? ""
      : termDetails.definition;
    const term = /^\.\.\.$/g.test(termDetails.term) ? "" : termDetails.term;

    setState({
      term,
      definition
    });
    setLabel({
      termLabel: Boolean(term),
      definitionLabel: Boolean(definition)
    });
  }, []);

  useEffect(
    () => {
      setTranslation(0);
    },
    [isVisible]
  );

  useEffect(
    () => {
      if (state.term || state.definition) {
        updateTerm({
          id,
          ...state,
          ...rows
        });
      }
    },
    [state, rows]
  );

  function handleFocus(event) {
    const id = event.target.id;

    setFocus(state => ({
      ...state,
      [`${id}Focus`]: true
    }));
    setLabel(state => ({
      ...state,
      [`${id}Label`]: true
    }));
  }

  function handleBlur(event) {
    const hasValue = event.target.value ? true : false;
    const id = event.target.id;

    setFocus(state => ({
      ...state,
      [`${id}Focus`]: false
    }));
    setLabel(state => ({
      ...state,
      [`${id}Label`]: hasValue
    }));
  }

  function handleChange(event) {
    const elementRows = resizeTextarea(event, minRows, lineHeight);
    const { id, value } = event.target;

    setRows(state => ({
      ...state,
      [`${id}Rows`]: elementRows
    }));
    setState(state => ({
      ...state,
      [id]: value
    }));
  }

  function handleTouchStart(event) {
    setLastTouch(event.targetTouches[0].clientX);
    setFirstTouch(event.targetTouches[0].clientX);
  }

  function handleTouchMove(event) {
    const currentTouch = event.targetTouches[0].clientX;
    let tranlation = (translation = -(firstTouch - currentTouch));

    setCurrentTouch(currentTouch);

    if (lastTouch > currentTouch) {
      onMove(true, element);

      if (translation <= -80) {
        translation = -80;
      } else if (translation > 0) {
        translation = 0;
      }
    } else if (lastTouch < currentTouch) {
      if (translation >= 0) {
        translation = 0;
      } else if (translation < -80) {
        translation = -80;
      }
    }

    setTranslation(translation);
    setLastTouch(currentTouch);
  }

  function handleTouchEnd(event) {
    if (translation < -40) {
      setTranslation(-80);
    } else {
      onMove(false, element);
      setTranslation(0);
    }
  }

  function handleBlockFocus(event) {
    let isBlockFocused = true;

    if (event.type === "blur" && event.relatedTarget !== buttonRef) {
      isBlockFocused = false;
    }

    setIsBlockFocused(isBlockFocused);
  }

  function removeElement(event) {
    event.preventDefault();
    removeTerm(id);
  }

  function resizeTextarea(event, minRows, lineHeight) {
    const previousRows = event.target.rows;
    event.target.rows = minRows;

    const currentRows = ~~(event.target.scrollHeight / lineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    return currentRows;
  }

  return (
    <Wrapper onBlur={handleBlockFocus} onFocus={handleBlockFocus}>
      <TermWrapper
        translation={translation}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <DefineTerm>
          <Textarea
            id="term"
            lang="es"
            value={state.term}
            rows={rows.termRows}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <Label isVisible={label.termLabel} htmlFor="term">
            term
          </Label>
          <Border focused={focus.termFocus} />
        </DefineTerm>
        <DefineTerm>
          <Textarea
            id="definition"
            value={state.definition}
            rows={rows.definitionRows}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <Label isVisible={label.definitionLabel} htmlFor="definition">
            definition
          </Label>
          <Border focused={focus.definitionFocus} />
        </DefineTerm>
      </TermWrapper>
      <DeleteButton
        ref={buttonRef}
        isVisible={translation < -55 ? true : false}
        isFocused={isBlockFocused}
        onClick={removeElement}
      >
        <img src={remove} alt="remove" />
      </DeleteButton>
    </Wrapper>
  );
};

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
  grid-row-gap: 0.5rem;
  place-content: center;
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  transition: transform 0.1s ease-out;

  @media (min-width: 768px) {
    grid-template-columns: 100%;
    grid-column: 2 / 3;
    background: none;
  }
`;

const DefineTerm = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  display: ${props => props.isVisible && "none"};
  font-size: ${props => (props.htmlFor === "term" ? "1.6rem" : "1.4rem")};
  color: ${colors.darkGray};
  position: absolute;
  bottom: 0px;
  left: 2px;
  z-index: -1;
`;

const Textarea = styled(BasicTextArea)`
  color: ${props =>
    props.id === "term" ? `${colors.white}` : `${colors.lightGray}`};
  padding: 2px 0;
  font-size: 1.6rem;
  line-height: 1.8rem;
  width: 100%;
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
  display: ${props => (props.isVisible ? "block" : "none")};
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
    opacity: ${props => (props.isFocused ? 1 : 0)};

    img {
      width: 2rem;
      height: 2rem;
    }
  }
`;

export default Term;
