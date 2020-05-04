import React, { Component } from 'react';

import styled from 'styled-components';
import { LinkButton, Main, fonts } from '../assets/styles/GlobalStyles';
import SetsList from '../components/dashboard/SetsList';

class HomePage extends Component {
  componentDidMount() {
    this.props.changeLocation('home');
    this.props.changeLastLocation("/");
  }

  render() {
    // will-change: transform
    const { isLogged, allSets, userSets } = this.props;

    return (
      <>
        <Main width={30} minWidth={350} maxWidth={450}>
          <Title>Are you ready for a new dose of words?</Title>

          { (userSets.length > 0) &&        // change to nullish coalescing operator
            <SetsList
              isPercentage={true}
              sets={userSets}
              title="get back to learn"
              margin="4rem 0"
            />
          }
          <SetsList
            isPercentage={false}
            sets={allSets}
            title="available sets"
            margin="4rem 0"
          />

          <LinkButton
            center="true"
            to={isLogged ? '/create' : '/signup'}
          >
            create set
          </LinkButton>
        </Main>
      </>
    );
  }
}


const Title = styled.h1`
  text-align: center;
  font-size: 2.2rem;
  font-weight: ${fonts.bold};
  margin: 0 7vw;
`;


export default HomePage
