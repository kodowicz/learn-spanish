import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled, { css } from "styled-components";

import TermsList from "../components/dashboard/TermsList";
import DeleteSetOverlay from "../components/overlay/DeleteSetOverlay";
import {
  Button,
  Main,
  BasicInput,
  colors
} from "../assets/styles/GlobalStyles";

const EditSet = ({
  uid,
  setid,
  setName,
  terms,
  isEditSubmited,
  isSetDeleted,
  isOverlayOpen,
  editSetName,
  addNewTerm,
  updateTerm,
  removeTerm,
  setCurrentSetId,
  changeLocation,
  changeLastLocation,
  submitEditSet,
  askForDeleting,
  deleteEditSet,
  deleteSetChanges,
  notificationError
}) => {
  const [topic, setTopic] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isFilled, setFilled] = useState(false);

  useEffect(() => {
    setCurrentSetId(setid);
    changeLocation("edit");
    changeLastLocation("/");
  }, []);

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
    setFilled(topic ? true : false);
  }

  function addTerm(event) {
    event.preventDefault();
    if (terms.length === 50) {
      notificationError("You've reached a limit of terms");
    } else {
      addNewTerm();
    }
  }

  if (!uid) return <Redirect to={`/sets/${setid}`} />;
  if (isEditSubmited) return <Redirect to={`/sets/${setid}`} />;
  if (isSetDeleted) return <Redirect to="/" />;

  if (isOverlayOpen) {
    return (
      <DeleteSetOverlay
        isEdited
        deleteSet={deleteEditSet}
        deleteSetChanges={deleteSetChanges}
        askForDeleting={askForDeleting}
      />
    );
  } else {
    return (
      <Main width={80} desktop={500}>
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
            terms={terms}
            askForDeleting={askForDeleting}
            submitSet={submitEditSet}
            notificationError={notificationError}
          />

          <TermsListWrapper>
            <TermsList
              terms={terms}
              updateTerm={updateTerm}
              removeTerm={removeTerm}
            />
          </TermsListWrapper>

          <AddButton onClick={addTerm}>add term</AddButton>
        </Form>
      </Main>
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
      notificationError("You have to create at least 4 terms");
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
  font-size: 2rem;
  color: ${colors.azure};
  transition: opacity 0.1s;
  z-index: -1;

  ${props =>
    props.isFilled &&
    css`
      opacity: 0;
    `} @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const NameInput = styled(BasicInput)`
  padding: 2px;
  width: 100%;
  font-size: 2rem;
  outline-color: ${colors.blue};
  color: ${colors.white};

  &:focus + ${NameLabel} {
    opacity: 0;
  }

  @media (min-width: 768px) {
    font-size: 2.5rem;
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

export default EditSet;
