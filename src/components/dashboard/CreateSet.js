import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLocation, changeLastLocation } from '../../store/actions/locationActions';

import styled, { css } from 'styled-components';
import { Button, Main, BlockShadow, BasicInput, colors } from '../../styled/GlobalStyles';


const SetName = styled.div`
  position: relative;
  margin: 100px 10px 50px;
`;

const NameLabel = styled.label`
  position: absolute;
  bottom: 5px;
  left: 0;
  color: ${colors.gray};
  transition: opacity 0.1s;

  ${props => props.isFilled && css `
    opacity: 0;
  `}
`;

const NameInput = styled(BasicInput)`
  padding: 5px 0;
  width: 100%;
  outline-color: ${colors.blue};

  &:focus + ${NameLabel} {
    opacity: 0;
  }
`;

const Border = styled.div`
  width: 100%;
  height: 1px;
  background: ${colors.gray};
  position: absolute;
  bottom: ${props => props.isBig ? '0' : '10px'};
  left: 0;
`;

const Form = styled.form`

`;

const SubmitButton = styled(Button)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%
`;

const TermWrapper = styled(BlockShadow)`
  padding: 5px 20px 25px 20px;
  margin: 25px 0;
`;

const DefineTerm = styled.div`
  position: relative;
  padding: 5px 0 10px 0;
`;

const Label = styled.label`
  position: absolute;
  bottom: -5px;
  left: 0;
  color: ${colors.gray};
  font-size: 10px;
  text-transform: uppercase;
`;

const Input = styled(BasicInput)`
  width: 100%;
  border: none;
  padding: 5px 0;
  outline-color: ${colors.blue}

`;




class CreateSet extends Component {
  componentDidMount() {
    this.props.changeLocation('create');
    this.props.changeLastLocation("/");
  }

  render() {
    return (
      <Main>
        <SetName>
          <NameInput />
          <NameLabel isFilled={isFilled} htmlFor="name">Name</NameLabel>
          <Border isBig="true" />
        </SetName>

        <Form>
          <Term />
          <Term />
          <Button>add term</Button>
          <SubmitButton>done</SubmitButton>
        </Form>

      </Main>
    )
  }
}

class Term extends Component {
  render() {
    return (
      <TermWrapper>
        <DefineTerm>
          <Input id="term" />
          <Label htmlFor="term">term</Label>
          <Border />
        </DefineTerm>
        <DefineTerm>
          <Input id="definition" />
          <Label htmlFor="definition">definition</Label>
          <Border />
        </DefineTerm>
      </TermWrapper>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.firebase.auth,
  location: state.location,
  lastLocation: state.lastLocation
})

export default connect(
  mapStateToProps,
  { changeLocation, changeLastLocation }
)(CreateSet);
