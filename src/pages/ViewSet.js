import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled, { css } from "styled-components";

import MethodChoiceOverlay from "../components/overlay/MethodChoiceOverlay";
import { Content } from "../components/Background";
import ProgressBar from "../components/ProgressBar";
import RatioDots from "../components/RatioDots";
import { LinkButton, Button, BlockElement, Switcher, colors, fonts } from "../assets/styles/GlobalStyles";

const ViewSet = ({
  match,
  setDetails,
  author,
  percentage,
  sortedBy,
  terms,
  signedUser,
  isUserSet,
  isOverlayOpen,
  sortTerms,
  createEditSet,
  chooseMethod,
  createLearnSet,
  createPlaySet,
  changeLocation,
  changeLastLocation,
  setContentHeight,
  removeNewKey,
  enableEditSet,
  setCurrentSetId
}) => {
  const iseditable = author === signedUser ? true : false;
  const progressBarWidth = window.innerWidth < 768 ? 6 : 7;

  useEffect(() => {
    changeLocation("set");
    changeLastLocation("/");
    removeNewKey();
    enableEditSet();
    setCurrentSetId(match.params.id);
  }, []);

  useEffect(
    () => {
      if (isOverlayOpen) setContentHeight(0);
    },
    [isOverlayOpen]
  );

  // handle if set doesn't exist
  if (terms.length === 0 && !setDetails) return <Redirect to="/404" />;

  if (isOverlayOpen) {
    return (
      <MethodChoiceOverlay
        signedUser={signedUser}
        setid={match.params.id}
        chooseMethod={chooseMethod}
        createLearnSet={createLearnSet}
        createPlaySet={createPlaySet}
      />
    );
  } else {
    return (
      <Content
        setContentHeight={setContentHeight}
        width={76}
        maxWidth={650}
        desktop={700}
      >
        <Description
          signedUser={signedUser}
          setDetails={setDetails}
          percentage={percentage}
          width={progressBarWidth}
        />

        <Buttons
          setid={match.params.id}
          iseditable={iseditable}
          createEditSet={createEditSet}
          chooseMethod={chooseMethod}
        />

        <TermsList
          terms={terms}
          isUserSet={isUserSet}
          sortedBy={sortedBy}
          sortTerms={sortTerms}
        />
      </Content>
    );
  }
};

const Description = ({ signedUser, setDetails, percentage, width }) => (
  <>
    <DetailsWrapper isExtended={!isNaN(percentage)}>
      <SetName isExtended={percentage}>{setDetails.name}</SetName>
      <Info>{setDetails.amount} terms</Info>
      <Border />
      <Info>
        {"by "}
        {signedUser === setDetails.authorId ? "you" : setDetails.author}
      </Info>
      {!isNaN(percentage) && (
        <Progress>
          <ProgressBar
            percentage={percentage}
            width={`${width}rem`}
            bgColor={colors.progress}
          />
        </Progress>
      )}
    </DetailsWrapper>
  </>
);

const Buttons = ({ setid, iseditable, chooseMethod, createEditSet }) => {
  const handleChoice = () => {
    // open overlay then create
    chooseMethod(true);
  };

  const handleEdit = () => {
    createEditSet();
  };

  return (
    <ButtonsWrapper iseditable={iseditable.toString()}>
      {iseditable && (
        <div onClick={handleEdit}>
          <LinkButton isCentre={true} to={`/edit/${setid}`}>
            edit set
          </LinkButton>
        </div>
      )}
      <Button onClick={handleChoice}>learn set</Button>
    </ButtonsWrapper>
  );
};

const TermsList = ({ terms, isUserSet, sortedBy, sortTerms }) => {
  return (
    <TermListWrapper>
      <ListLable>
        <SubTitle>terms</SubTitle>
        <Switcher
          sortedBy={sortedBy ? "alphabetical" : "original"}
          handleSwitch={sortTerms}
        />
      </ListLable>

      <List>
        {terms.map((term, index) => (
          <ListItem key={term.id}>
            <Counter isLessThanTen={index + 1 < 10 ? true : false}>
              {index + 1}
            </Counter>
            <SetWrapper isUserSet={isUserSet}>
              <Term id="term">{term.term}</Term>
              {isUserSet && <RatioDots ratio={term.ratio} />}
              <Line />
              <Term id="definition">{term.definition}</Term>
            </SetWrapper>
          </ListItem>
        ))}
      </List>
    </TermListWrapper>
  );
};

const DetailsWrapper = styled.div`
  grid-template-columns: ${({ isExtended }) =>
    isExtended
      ? "min-content 15px min-content 20% 90px"
      : "min-content 15px min-content 1fr"};
  display: inline-grid;
  grid-template-rows: repeat(2, min-content);
  grid-row-gap: 0.7rem;
  width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: ${({ isExtended }) =>
      isExtended
        ? "min-content 15px min-content 40% 90px"
        : "min-content 15px min-content 1fr"};
  }
`;

const SetName = styled.h1`
  max-width: ${({ percentage }) => (percentage ? "50vw" : "none")};
  font-weight: ${fonts.bold};
  grid-column: span 4;
  font-size: 3.2rem;
  margin: 0;

  @media (min-width: 768px) {
    max-width: ${({ percentage }) => (percentage ? "35rem" : "none")};
  }
`;

const Info = styled.span`
  color: ${colors.azure};
  grid-row: 2 / 3;
  white-space: nowrap;
`;

const Border = styled.div`
  background: ${colors.azure};
  height: 1.8rem;
  width: 1.5px;
  grid-column: 2 / 3;
  grid-row: 2 /3;
  place-self: center;
`;

const Progress = styled.figure`
  height: 6rem;
  margin: 0;
  grid-row: 1 / 3;
  grid-column: 5 / 6;
  place-self: center;
`;

const ButtonsWrapper = styled.div`
  margin: 40px auto 60px auto;
  display: flex;
  justify-content: space-evenly;
  max-width: 300px;

  @media (min-width: 768px) {
    justify-content: ${props =>
      props.iseditable
        ? "space-between"
        : "flex-start"
      };
    margin: 40px 0 60px;
  }
`;

const TermListWrapper = styled.div`
  width: 100%;
`;

const ListLable = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
`;

const SubTitle = styled.h2`
  color: ${colors.white};
  font-size: 1.6rem;
  margin: 0;
`;

const List = styled.ul`
  margin: 0 0 4rem 0;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 1.6rem;
  height: 7.7rem;
  height: auto;
  list-style: none;
  position: relative;

  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Counter = styled.span`
  left: ${props => (props.isLessThanTen ? "-8vw" : "-10vw")};
  color: ${colors.azure};
  font-weight: ${fonts.bold};
  position: absolute;
  top: 50%;
  font-size: 2.5rem;
  transform: translateY(-50%);
  user-select: none;

  @media (min-width: 768px) {
    left: -50px;
  }
`;

const SetWrapper = styled(BlockElement)`
  display: grid;
  align-content: start;
  padding: 1.6rem 2rem;
  height: 100%;

  ${({ isUserSet }) =>
    isUserSet
      ? css`
          grid-template-columns: 1fr 5rem;
          grid-template-rows: min-content min-content;
          grid-row-gap: 3px;
          grid-column-gap: 1.5rem;
        `
      : css`
          grid-template-columns: 1fr;
          grid-template-rows: min-content min-content;
          grid-row-gap: 3px;
        `};

  @media (min-width: 768px) {
    padding: 2rem 3.5rem;
    grid-template-rows: 1fr;
    align-items: center;

    ${({ isUserSet }) =>
      isUserSet
        ? css`
            grid-template-columns: 1fr 6rem 2px 1fr;
            grid-column-gap: 3.5rem;
          `
        : css`
            grid-template-columns: 1fr 3.5rem 1fr;
            grid-column-gap: 0;
          `};
  }
`;

const Term = styled.p`
  font-weight: ${props =>
    props.id === "term"
      ? `${fonts.bold}`
      : `${fonts.semiBold}`
  };
  font-size: ${props =>
    props.id === "term"
      ? "1.6rem"
      : "1.4rem"
  };
  color: ${props =>
    props.id === "term"
      ? `${colors.white}`
      : `${colors.lightGray}`
  };
  margin: 0;
  white-space: pre-line;
  user-select: text;
`;

const Line = styled.div`
  grid-column: span 2;

  @media (min-width: 768px) {
    background: ${colors.darkGray};
    grid-column: span 1;
    width: 2px;
    height: 2rem;
  }
`;

export default ViewSet;
