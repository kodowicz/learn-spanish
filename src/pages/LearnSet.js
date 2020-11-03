import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SpeechVoices } from "../components/speech/speechSynthesis";
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
  const [voices, setVoices] = useState([]);
  const settings = {
    langs: [
      "Microsoft Elvira Online (Natural) - Spanish (Spain)",
      "Google español de Estados Unidos",
      "Mónica"
    ],
    pitch: 1,
    rate: 1,
    volume: 1
  }

  useEffect(
    () => {
      if (!voices.length) {
        const speechSynthesis = new SpeechVoices();
        const voices = speechSynthesis.getVoices();

        setVoices(voices)
      }
    },
    [voices]
  );

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
          settings={settings}
          voices={voices}
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
  settings,
  voices,
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
              settings={settings}
              voices={voices}
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
  grid-template-rows: 30rem;
  grid-template-columns: 22rem;
  cursor: grab;

  @media (min-width: 768px) {
    height: 90vh;
  }
`;

export default LearnSet;
