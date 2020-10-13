import React from 'react';
import SetsList from '../components/dashboard/SetsList';

import styled from 'styled-components';
import { Main, Input, fonts } from '../assets/styles/GlobalStyles';


class Search extends React.Component {
  state = {
    value: ""
  }

  componentDidMount() {
    this.props.changeLocation('search');
    this.props.changeLastLocation("/");

  }

  handleChange = event => {
    this.setState({
      value: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.searchForSets(this.state.value)
  }

  render() {
    const { searchedSets } = this.props;
    const { value } = this.state;

    return (
      <Main width={80} maxWidth={450} desktop={720}>
        <Header>What are you looking for?</Header>

        <Form onSubmit={this.handleSubmit}>
          <Input
            placeholder="e.g. animals"
            value={value}
            onChange={this.handleChange} />
        </Form>

        { (searchedSets && searchedSets.length > 0) &&
          <SetsList
            isPercentage={false}
            sets={searchedSets}
            title=""
            margin="4rem 0"
          />
        }
        { (searchedSets && searchedSets.length === 0) &&
          <Info>sorry! no set found</Info>
        }
      </Main>
    );
  }
}


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


export default Search
