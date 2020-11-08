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
  unsavedSetTerms,
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
  notificationError
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
      if (isOverlayOpen) setContentHeight(0);
    },
    [isOverlayOpen]
  );

  useEffect(
    () => {
      setTopic(setName);
      setFilled(setName ? true : false);
    },
    [setName]
  );

  function changeTopic(event) {
    const topic = event.target.value;
    setTopic(topic);
    setUnsavedName(topic);
    setFilled(topic ? true : false);
  }

  function addTerm(event) {
    event.preventDefault();
    if (unsavedSetTerms.length === 50) {
      notificationError("You've reached a limit of terms");
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
        <Form>
          <SetName>
            <NameInput value={topic} maxLength="30" onChange={changeTopic} />
            <NameLabel isFilled={isFilled} htmlFor="name">
              Name your set
            </NameLabel>
            <Border isBig="true" />
          </SetName>

          <Buttons
            topic={topic}
            terms={unsavedSetTerms}
            askForDeleting={askForDeleting}
            submitSet={submitCreateSet}
            notificationError={notificationError}
          />

          <TermsListWrapper>
            <TermsList
              terms={unsavedSetTerms}
              updateTerm={updateUnsavedTerm}
              removeTerm={removeUnsavedTerm}
            />
          </TermsListWrapper>

          <AddButton onClick={addTerm}>add term</AddButton>
        </Form>
      </Content>
    );
  }
};

const Buttons = ({
  topic,
  terms,
  askForDeleting,
  submitSet,
  notificationError
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
      notificationError("You must enter a title to save your set");
    } else if (reducedTerms.length < 4) {
      notificationError("You must create at least 4 terms");
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
  position: absolute;
  bottom: 2px;
  left: 2px;
  font-size: 20px;
  color: ${colors.azure};
  transition: opacity 0.1s;
  z-index: -1;

  ${props =>
    props.isFilled &&
    css`
      opacity: 0;
    `};
`;

const NameInput = styled(BasicInput)`
  padding: 2px;
  width: 100%;
  font-size: 2rem;
  outline-color: ${colors.blue};
  color: ${colors.white};
  user-select: auto;

  &:focus + ${NameLabel} {
    opacity: 0;
  }
`;

const Border = styled.div`
  width: 100%;
  height: 2px;
  background: ${colors.white};
  position: absolute;
  bottom: ${props => (props.isBig ? "-2px" : "10px")};
  left: 0;
`;

const ButtonsWrapper = styled.div`
  margin: 40px auto 60px auto;
  display: flex;
  justify-content: space-evenly;
  max-width: 300px;

  ${"" /* @media (min-width: 768px) {
    ${props => props.iseditable ? 'justify-content: space-between' : false };
  } */};
`;

const Form = styled.form``;

const TermsListWrapper = styled.div`
  width: 76vw;
  margin: 0 auto;

  @media (min-width: 786px) {
    width: 100%;
  }
`;

const AddButton = styled(Button)`
  margin: 50px auto;
`;

export default CreateSet;
