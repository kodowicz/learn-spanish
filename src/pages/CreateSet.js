import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TermsList from '../components/dashboard/TermsList';
import DeleteSetOverlay from '../components/overlay/DeleteSetOverlay';

import styled, { css } from 'styled-components';
import { Button, Main, BasicInput, colors } from '../assets/styles/GlobalStyles';


class CreateSet extends Component {
  state = {
    setName: ""
  }

  componentDidMount() {
    this.props.changeLocation('create');
    this.props.changeLastLocation("/");

  }

  componentWillMount() {
    this.setState({
      setName: this.props.unsavedSetName
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

  render() {
    const { setName } = this.state;
    const isFilled = setName ? true : false;
    const {
      auth,
      unsavedSetTerms,
      newSetKey,
      isSetDeleted,
      updateUnsavedTerm,
      removeUnsavedTerm,
      submitSet,
      deleteUnsavedSet,
      askForDeleting
    } = this.props;


    if (!auth.uid) return <Redirect to="/signup" />;
    if (newSetKey) return <Redirect to={`/sets/${newSetKey}`} />

    if (isSetDeleted) {
      return (
        <DeleteSetOverlay
          deleteSet={deleteUnsavedSet}
          askForDeleting={askForDeleting}
         />
       )
    } else {
      return (

        <Main width={30} minWidth={350} maxWidth={450}>
          <form>
            <SetName>
              <NameInput
                value={setName}
                maxLength="40"
                onChange={this.setName}
                onBlur={this.submitName}
              />
              <NameLabel
                isFilled={isFilled}
                htmlFor="name"
              >
                Name your set
              </NameLabel>
              <Border />
            </SetName>

            <Buttons
              terms={unsavedSetTerms}
              submitSet={submitSet}
              askForDeleting={askForDeleting}
            />

            <TermsListWrapper>
              <TermsList
                basicTwoTerms={this.props.basicTwoTerms}
                terms={unsavedSetTerms}
                updateTerm={updateUnsavedTerm}
                removeTerm={removeUnsavedTerm}
              />
            </TermsListWrapper>

            <AddButton onClick={this.addTerm}>add term</AddButton>
          </form>

        </Main>
      )
    }
  }
}

const Buttons = ({ terms, submitSet, askForDeleting }) => {

  const handleSubmitSet = (event) => {
    event.preventDefault();
    submitSet(terms);
  }

  const handleDeleteSet = (event) => {
    event.preventDefault();
    askForDeleting(true);
  }

  return (
    <ButtonsWrapper>
      <Button onClick={handleSubmitSet}>save set</Button>
      <Button onClick={handleDeleteSet}>delete set</Button>
    </ButtonsWrapper>
  );
};


const SetName = styled.div`
  position: relative;
  z-index: 0;
`;

const NameLabel = styled.label`
  color: ${colors.azure};
  position: absolute;
  bottom: 2px;
  left: 2px;
  font-size: 2rem;
  transition: opacity 0.1s;
  z-index: -1;

  ${props => props.isFilled && css `
    opacity: 0;
  `}
`;

const NameInput = styled(BasicInput)`
  outline-color: ${colors.blue};
  color: ${colors.white};
  padding: 2px;
  width: 100%;
  font-size: 2rem;

  &:focus + ${NameLabel} {
    opacity: 0;
  }
`;

const Border = styled.div`
  background: ${colors.white};
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: -2px;
  left: 0;
`;

const ButtonsWrapper = styled.div`
  margin: 40px auto 60px auto;
  display: flex;
  justify-content: space-evenly;
  max-width: 300px;
`;

const TermsListWrapper = styled.div`
  width: 76vw;
  margin: 0 auto;

  @media (min-width: 786px) {
    margin: 0 40px
  }
`;

const AddButton = styled(Button)`
  margin: 50px auto
`;


export default CreateSet
