import React from "react";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-component";
import styled from "styled-components";
import { BlockElement, colors, fonts } from "../../assets/styles/GlobalStyles";
import ProgressBar from "../ProgressBar";

const SetsList = ({ sets, title, margin, isPercentage }) => {
  function calculatePercentage(set) {
    const knowledge = set.knowledge;
    const amount = set.amount;
    const percentage = Math.round((knowledge * 100) / (amount * 5));

    return percentage || 0;
  }

  const setsList = sets.map(set => (
    <ListItem key={set.id}>
      <Link to={`/sets/${set.id}`}>
        <SetWrapper>
          <Topic>{set.name}</Topic>
          <Amount>{set.amount} terms</Amount>
          { isPercentage ? (
            <Progress>
              <ProgressBar
                percentage={calculatePercentage(set)}
                width={4.6}
                bgColor={colors.blue}
                progressColor={colors.white}
              />
            </Progress>
          ) : (
            <Author>by {set.author}</Author>
          )}
        </SetWrapper>
      </Link>
    </ListItem>
  ));

  return (
    <ListWrapper margin={margin}>
      <ListTitle>{title}</ListTitle>
      <List elementType={"ul"}>{setsList}</List>
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  margin: ${ props => props.margin || "0" };
`;

const ListTitle = styled.p`
  font-size: 1.4rem;
  margin: 1rem 0;

  @media (min-width: 768px) {
    font-size: 1.6rem;
  }
`;

const List = styled(Masonry)`
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  list-style: none;
  margin: 0 0 20px 0;
  width: 100%;

  a {
    text-decoration: none;
  }

  @media (min-width: 768px) {
    margin: 0;
    width: 24rem;
  }
`;

const SetWrapper = styled(BlockElement)`
  min-height: 8rem;
  display: grid;
  grid-template-columns: 1fr 60px;
  grid-template-rows: min-content min-content;
  align-content: center;
  padding: 2rem 2.5rem;
  color: ${colors.white};
  font-size: 1.2rem;
  grid-gap: 0.5rem;

  @media (min-width: 768px) {
    margin: 0 2rem 2rem 0;
  }
`;

const Topic = styled.p`
  font-size: 1.8rem;
  font-weight: ${fonts.bold};
  margin: 0;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Amount = styled.p`
  margin: 0;
  grid-column: 1 / 2;
  grid-row: 2 / 3;
`;

const Author = styled.p`
  margin: 0;
  grid-row: 2 / 3;
  justify-self: end;
`;

const Progress = styled.figure`
  height: 4.6rem;
  margin: 0;
  grid-row: 1 / 3;
  grid-column: 2 / 3;
  justify-self: end;
  align-self: center;
`;

export default SetsList;
