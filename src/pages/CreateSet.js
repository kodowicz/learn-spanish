import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled, { css } from "styled-components";

import { Content } from "../components/Background";
import TermsList from "../components/dashboard/TermsList";
import DeleteSetOverlay from "../components/overlay/DeleteSetOverlay";
import { Button, BasicInput, colors } from "../assets/styles/GlobalStyles";

const CreateSet = ({
  uid,
  setid,
  setName,
  terms,
  newSetKey,
  isSetDeleted,
  isOverlayOpen,
  setUnsavedName,
  addNewUnsavedTerm,
  updateUnsavedTerm,
  removeUnsavedTerm,
  changeLocation,
  changeLastLocation,
  setContentHeight,
  submitCreateSet,
  askForDeleting,
  deleteCreateSet,
  setNotification
}) => {
  const [topic, setTopic] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isFilled, setFilled] = useState(false);

  useEffect(() => {
    changeLocation("create");
    changeLastLocation("/");
  }, []);

  useEffect(
    () => {
      setTopic(setName);
      setFilled(setName ? true : false);
    },
    [setName]
  );

  useEffect(
    () => {
      if (isOverlayOpen) setContentHeight(0);
    },
    [isOverlayOpen]
  );

  function changeTopic(event) {
    const topic = event.target.value;
    setTopic(topic);
    setUnsavedName(topic);
    setFilled(topic ? true : false);
  }

  function addTerm(event) {
    event.preventDefault();
    if (terms.length === 50) {
      setNotification("You've reached a limit of terms");
    } else {
    addNewUnsavedTerm();
    }
  }

  if (!uid) return <Redirect to="/signup" />;
  if (newSetKey) return <Redirect to={`/sets/${newSetKey}`} />;
  if (isSetDeleted) return <Redirect to="/" />;

  if (isOverlayOpen) {
    return (
      <DeleteSetOverlay
        deleteSet={deleteCreateSet}
        askForDeleting={askForDeleting}
      />
    );
  } else {
    return (
      <Content setContentHeight={setContentHeight} width={80} desktop={500}>
        <form>
          <SetName>
            <NameInput value={topic} maxLength="30" onChange={changeTopic} />
            <NameLabel isFilled={isFilled} htmlFor="name">
              Name your set
            </NameLabel>
            <Border />
          </SetName>

          <Buttons
            topic={topic}
            terms={terms}
            askForDeleting={askForDeleting}
            submitSet={submitCreateSet}
            setNotification={setNotification}
          />

          <TermsListWrapper>
            <TermsList
              terms={terms}
              updateTerm={updateUnsavedTerm}
              removeTerm={removeUnsavedTerm}
            />
          </TermsListWrapper>

          <AddButton onClick={addTerm}>add term</AddButton>
        </form>
      </Content>
    );
  }
};

const Buttons = ({
  topic,
  terms,
  askForDeleting,
  submitSet,
  setNotification
}) => {
  function reduceTerms(terms) {
    return terms
      .map(element => {
        return {
          ...element,
          term: element.term.trim(),
          definition: element.definition.trim()
        };
      })
      .map(element => {
        const { term, definition } = element;

        if (
          (/^\s$/.test(term) || term.length === 0) &&
          (/^\s$/.test(definition) || definition.length === 0)
        ) {
          return null;
        } else if (/^\s$/.test(term) || term.length === 0) {
          return { ...element, term: "..." };
        } else if (/^\s$/.test(definition) || definition.length === 0) {
          return { ...element, definition: "..." };
        } else {
          return element;
        }
      })
      .filter(element => element);
  }

  function handleSubmitSet(event) {
    const reducedTerms = reduceTerms(terms);
    event.preventDefault();

    if (!topic || /^\s$/.test(topic)) {
      setNotification("You must enter a title to save your set");
    } else if (reducedTerms.length < 4) {
      setNotification("You must create at least 4 terms");
    } else {
      submitSet(reducedTerms);
    }
  }

  function handleDeleteSet(event) {
    event.preventDefault();
    askForDeleting(true);
  }

  return (
    <ButtonsWrapper>
      <Button onClick={handleDeleteSet}>delete set</Button>
      <Button onClick={handleSubmitSet}>save set</Button>
    </ButtonsWrapper>
  );
};

const SetName = styled.div`
  position: relative;
  z-index: 0;
`;

const NameLabel = styled.label`
  ${({ isFilled }) =>
    isFilled &&
    css`
      opacity: 0;
    `};

  color: ${colors.azure};
  position: absolute;
  bottom: 2px;
  left: 2px;
  font-size: 2rem;
  transition: opacity 0.1s;
  z-index: -1;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const NameInput = styled(BasicInput)`
  outline-color: ${colors.blue};
  color: ${colors.white};
  padding: 2px;
  width: 100%;
  font-size: 2rem;
  user-select: auto;

  &:focus + ${NameLabel} {
    opacity: 0;
  }

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Border = styled.div`
  background: ${colors.white};
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: -2px;
  left: 0;
`;

const ButtonsWrapper = styled.div`
  margin: 4rem auto 6rem auto;
  display: flex;
  justify-content: space-evenly;
  max-width: 30rem;
`;

const TermsListWrapper = styled.div`
  width: 76vw;
  margin: 0 auto;

  @media (min-width: 786px) {
    width: 100%;
  }
`;

const AddButton = styled(Button)`
  margin: 5rem auto;
`;

export default CreateSet;
