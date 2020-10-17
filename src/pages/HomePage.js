import React, { useEffect } from "react";
import styled from "styled-components";

import SetsList from "../components/dashboard/SetsList";
import { LinkButton, Main, fonts } from "../assets/styles/GlobalStyles";

const HomePage = ({
  userSets,
  allSets,
  changeLocation,
  changeLastLocation,
  enableEditSet
}) => {
  useEffect(() => {
    changeLocation("home");
    changeLastLocation("/");
    enableEditSet();
  }, []);

  return (
    <>
      <Main width={80} maxWidth={450} desktop={720}>
        <Title>Are you ready for a new dose of words?</Title>

        {userSets?.length > 0 && (
          <SetsList
            isPercentage={true}
            sets={userSets}
            title="get back to learn"
            margin="4rem 0"
          />
        )}

        <SetsList
          isPercentage={false}
          sets={allSets}
          title="available sets"
          margin="4rem 0"
        />
      </Main>
    </>
  );
};

const Title = styled.h1`
  text-align: center;
  font-size: 2.2rem;
  font-weight: ${fonts.bold};
  margin: 0 7vw;

  @media (min-width: 768px) {
    font-size: 3.6rem;
    margin: 0;
    margin-bottom: 6rem;
  }
`;

export default HomePage;
