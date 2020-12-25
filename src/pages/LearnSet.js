import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { SpeechVoices } from "../components/speech/speechSynthesis";
import StopLearningOverlay from "../components/overlay/StopLearningOverlay";
import { FrontCard, BackCard, Congratulations } from "../components/dashboard/Flashcard";
import { Switcher } from "../assets/styles/GlobalStyles";

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
  changeLastLocation,
  setContentHeight
}) => {
  const [voices, setVoices] = useState([]);
  const [sortedBy, setSortedBy] = useState(true);
  const settings = {
    langs: [
      "Microsoft Elvira Online (Natural) - Spanish (Spain)",
      "Google español de Estados Unidos",
      "Mónica"
    ],
    pitch: 1,
    rate: 1,
    volume: 1
  };
  const contentRef = useRef(null);

  useEffect(() => {
    setCurrentSetId(setid);
    createLearnSet(setid);
    changeLocation("learn");
    changeLastLocation(`/sets/${setid}`);
    setContentHeight(contentRef.current.clientHeight);
  }, []);

  useEffect(
    () => {
      if (isOverlayOpen) setContentHeight(0);
    },
    [isOverlayOpen]
  );

  useEffect(
    () => {
      if (!voices.length) {
        const speechSynthesis = new SpeechVoices();
        const voices = speechSynthesis.getVoices();

        setVoices(voices);
      }
    },
    [voices]
  );

  return (
    <Content ref={contentRef}>
      { !isOverlayOpen &&
        <InfoBar>
          <span>{leftTerms} / {amount}</span>
          <Switcher
            sortedBy={sortedBy ? "spanish" : "english"}
            handleSwitch={() => setSortedBy(!sortedBy)}
          />
        </InfoBar>
      }
      <Cards>
        <Flashcards
          amount={amount}
          leftTerms={leftTerms}
          setid={setid}
          terms={terms}
          sortedBy={sortedBy}
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
    </Content>
  );
};

const Flashcards = ({
  amount,
  leftTerms,
  setid,
  terms,
  sortedBy,
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
              item={term}
              sortedBy={sortedBy}
              moveEnabled={true}
              settings={settings}
              voices={voices}
              shuffleCard={shuffleCard}
              throwoutCard={throwoutCard}
            />
          );
        } else if (term.layerIndex === -1) {
          return (
            <BackCard
              key={term.id}
              layerIndex={term.layerIndex}
              item={term}
              sortedBy={sortedBy}
            />
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
            item={terms[0]}
            sortedBy={sortedBy}
            moveEnabled={false}
            settings={settings}
            voices={voices}
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

const Content = styled.div`
  height: 100%;
`;

const InfoBar = styled.div`
  position: fixed;
  z-index: 1;
  top: 7rem;
  width: calc(100% - 14vw);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  @media (min-width: 768px) {
    width: 50rem;
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
