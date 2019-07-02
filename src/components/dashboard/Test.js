import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TermsList from './TermsList';

import styled, { css } from 'styled-components';
import { Button, Main, colors } from '../../assets/styles/GlobalStyles';


const Form = styled.form`
  margin: 100px 0;
  padding-bottom: 100px
`;

const AddButton = styled(Button)`
  margin: 50px auto
`;

const SubmitButton = styled(Button)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%
`;




class Test extends Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    this.props.changeLocation(this.props.title);
  }

  addTerm = event => {
    event.preventDefault();
    this.props.addNewTerm();
  }

  submitSet = event => {
    event.preventDefault();
    this.setState({
      redirect: true
    })
  }

  render() {
    const { terms, updateTerm, removeTerm } = this.props;

    if (this.state.redirect) return <Redirect to="/" />;

    return (
      <Main>
        <Form>
          { terms ?
              <>
                <TermsList
                  basicTwoTerms={this.props.basicTwoTerms}
                  terms={terms}
                  updateTerm={updateTerm}
                  removeTerm={removeTerm}
                />
              </>
            :
            <></>
          }
          <AddButton onClick={this.addTerm}>add term</AddButton>
          <SubmitButton onClick={this.submitSet}>done</SubmitButton>
        </Form>

      </Main>
    )
  }
}

export default Test
