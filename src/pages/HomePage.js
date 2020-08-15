import React, { Component } from 'react';
import SetsList from '../components/dashboard/SetsList';

import styled from 'styled-components';
import { LinkButton, Main, fonts } from '../assets/styles/GlobalStyles';


class HomePage extends Component {
  componentDidMount() {
    this.props.changeLocation('home');
    this.props.changeLastLocation("/");
    this.props.enableEditSet();
    window.scrollTo(0, 0);
  }

  render() {
    // will-change: transform
    const { userSets, allSets } = this.props;

    return (
      <>
        <Main width={80} maxWidth={450} desktop={720}>
          <Title>Are you ready for a new dose of words?</Title>

          { userSets?.length &&
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

  @media (min-width: 768px) {
    font-size: 3.6rem;
    margin: 0;
    margin-bottom: 6rem;
  }
`;


export default HomePage
