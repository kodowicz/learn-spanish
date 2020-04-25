import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TermsList from '../components/dashboard/TermsList';
import DeleteSetOverlay from '../components/overlay/DeleteSetOverlay';

import styled, { css } from 'styled-components';
import { Button, Main, BasicInput, colors } from '../assets/styles/GlobalStyles';


const SetName = styled.div`
  position: relative;
  margin: 100px 10px 60px;
`;

const NameLabel = styled.label`
  position: absolute;
  bottom: 5px;
  left: 0;
  font-size: 20px;
  color: ${colors.gray};
  transition: opacity 0.1s;

  ${props => props.isFilled && css `
    opacity: 0;
  `}
`;

const NameInput = styled(BasicInput)`
  padding: 2px 0;
  width: 100%;
  font-size: 20px;
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
  margin: 100px 0;
  padding-bottom: 100px
`;

const AddButton = styled(Button)`
  margin: 50px auto
`;

const SubmitButton = styled(Button)`
  position: fixed;
  bottom: 2px;
  left: 2px;
  width: calc(100% - 4px);
  color: white;
  background: ${colors.blue};

  @media (min-width: 768px) {
    width: 200px;
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);

    &:focus {
      transform: translate(-50%, 2px);
    }
  }
`;

const DeleteButton = styled(Button)`

`



class CreateSet extends Component {
  state = {
    setName: ""
  }

  componentDidMount() {
    this.props.changeLocation('create');
    this.props.changeLastLocation("/");
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      setName: newProps.unsavedSetName
    })
  }

  setName = event => {
    this.setState({
      setName: event.target.value
    })
  }

  addTerm = event => {
    event.preventDefault();
    this.props.addNewUnsavedTerm();
  }

  submitName = () => {
    this.props.setUnsavedName(this.state.setName)
  }

  submitSet = event => {
    event.preventDefault();
    this.props.submitSet()
  }

  deleteSet = event => {
    event.preventDefault();
    this.props.submitSet()
  }

  render() {
    const { auth, unsavedSetTerms, newSetKey, updateUnsavedTerm, removeUnsavedTerm } = this.props;
    const { setName } = this.state;
    const isFilled = setName ? true : false;

    if (!auth.uid) return <Redirect to="/signup" />;
    if (newSetKey) return <Redirect to={`/sets/${newSetKey}`} />

    return (
      <Main width={30} minWidth={350} maxWidth={450}>
        <SetName>
          <NameInput value={setName} onChange={this.setName} onBlur={this.submitName} />
          <NameLabel isFilled={isFilled} htmlFor="name">Name your set</NameLabel>
          <Border isBig="true" />
        </SetName>

        <SubmitButton onClick={this.submitSet}>save set</SubmitButton>
        <DeleteButton onClick={this.deleteSet}>delete set</DeleteButton>

        <DeleteSetOverlay />
        <Form>
          { unsavedSetTerms ?
              <>
                <TermsList
                  basicTwoTerms={this.props.basicTwoTerms}
                  terms={unsavedSetTerms}
                  updateTerm={updateUnsavedTerm}
                  removeTerm={removeUnsavedTerm}
                />
              </>
            :
            <></>
          }
          <AddButton onClick={this.addTerm}>add term</AddButton>
        </Form>

      </Main>
    )
  }
}

export default CreateSet
