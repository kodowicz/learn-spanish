import React, { useEffect } from "react";
import styled from "styled-components";
import StopLearningOverlay from "../components/overlay/StopLearningOverlay";
import {
  FrontCard,
  BackCard,
  Congratulations
} from "../components/dashboard/Flashcard";

const LearnSet = ({
  amount,
  leftTerms,
  setid,
  terms,
  isOverlayOpen,
  cancelSesion,
  shuffleCard,
  throwoutCard,
  createLearnSet,
  setCurrentSetId,
  changeLocation,
  changeLastLocation
}) => {
  useEffect(() => {
    setCurrentSetId(setid);
    createLearnSet(setid);
    changeLocation("learn");
    changeLastLocation(`/sets/${setid}`);
  }, []);

  return (
    <>
      <Counter>
        {leftTerms} / {amount}
      </Counter>
      <Cards>
        <Flashcards
          amount={amount}
          leftTerms={leftTerms}
          setid={setid}
          terms={terms}
          isOverlayOpen={isOverlayOpen}
          cancelSesion={cancelSesion}
          shuffleCard={shuffleCard}
          throwoutCard={throwoutCard}
          createLearnSet={createLearnSet}
          setCurrentSetId={setCurrentSetId}
          createLearnSet={createLearnSet}
          changeLocation={changeLocation}
          changeLastLocation={changeLastLocation}
        />
      </Cards>
    </>
  );
};

const Flashcards = ({
  amount,
  leftTerms,
  setid,
  terms,
  isOverlayOpen,
  cancelSesion,
  shuffleCard,
  throwoutCard,
  createLearnSet,
  setCurrentSetId,
  changeLocation,
  changeLastLocation
}) => {
  if (isOverlayOpen) {
    return (
      <StopLearningOverlay
        setid={setid}
        cancelSesion={cancelSesion}
        changeLastLocation={changeLastLocation}
      />
    );
  } else {
    if (terms.length > 1) {
      return terms.map(term => {
        if (term.layerIndex === 0) {
          return (
            <FrontCard
              key={term.id}
              layerIndex={term.layerIndex}
              term={term}
              moveEnabled={true}
              shuffleCard={shuffleCard}
              throwoutCard={throwoutCard}
            />
          );
        } else if (term.layerIndex === -1) {
          return (
            <BackCard key={term.id} layerIndex={term.layerIndex} term={term} />
          );
        } else {
          return <div key={term.id} />;
        }
      });
    } else if (terms.length === 1) {
      return (
        <>
          <FrontCard
            key={terms[0].id}
            layerIndex={terms[0].layerIndex}
            term={terms[0]}
            moveEnabled={false}
            shuffleCard={shuffleCard}
            throwoutCard={throwoutCard}
          />
          <Congratulations layerIndex={-1} />
        </>
      );
    } else {
      return (
        <Congratulations
          layerIndex={0}
          setid={setid}
          createLearnSet={createLearnSet}
        />
      );
    }
  }
};

const Counter = styled.span`
  position: absolute;
  top: 7rem;
  left: 7vw;

  @media (min-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Cards = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  width: 100vw;
  height: 100vh;
  position: absolute;
  place-content: center;
  grid-template-rows: 300px;
  grid-template-columns: 220px;
  cursor: grab;

  @media (min-width: 768px) {
    height: 90vh;
  }
`;

export default LearnSet;
