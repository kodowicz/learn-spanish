import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Content } from "../components/Background";
import SetsList from "../components/dashboard/SetsList";
import { Input, fonts } from "../assets/styles/GlobalStyles";

const Search = ({
  searchedSets,
  changeLocation,
  changeLastLocation,
  setContentHeight,
  searchForSets
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    changeLocation("search");
    changeLastLocation("/");
  }, []);

  function handleChange(event) {
    setValue(event.target.value);
    searchForSets(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <Content
      setContentHeight={setContentHeight}
      width={80}
      maxWidth={450}
      desktop={720}
    >
      <Header>What are you looking for?</Header>

      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="e.g. animals"
          value={value}
          onChange={handleChange}
        />
      </Form>

      <MatchedSets value={value} searchedSets={searchedSets} />
    </Content>
  );
};

const MatchedSets = ({ value, searchedSets }) => {
  if (searchedSets?.length) {
    return (
      <SetsList
        isPercentage={false}
        sets={searchedSets}
        title=""
        margin="4rem 0"
      />
    );
  } else {
    if (value) {
      return <Info>sorry! no set found</Info>;
    } else {
      return <Info />;
    }
  }
};

const Header = styled.h1`
  font-size: 2.3rem;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: ${fonts.bold};

  @media (min-width: 768px) {
    font-size: 3.6rem;
    margin: 0;
    margin-bottom: 6rem;
  }
`;

const Form = styled.form`
  width: 100%;

  @media (min-width: 768px) {
    width: 45rem;
    margin: 0 auto;
  }
`;

const Info = styled.p`
  text-align: center;
`;

export default Search;
