import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TermsList from '../components/dashboard/TermsList';
import DeleteSetOverlay from '../components/overlay/DeleteSetOverlay';

import styled, { css } from 'styled-components';
import { Button, Main, BasicInput, colors } from '../assets/styles/GlobalStyles';


class EditSet extends Component {
  state = {
    setName: "",
    redirect: false
  }

  componentDidMount() {
    this.props.changeLocation('edit');
    this.props.changeLastLocation("/");
    this.setState({
      setName: this.props.setName
    })
  }

  componentWillMount() {
    this.props.setCurrentSetId(this.props.setid);
    this.props.createEditSet();
  }

  componentDidUpdate(prevProps) {
    if (this.props.setName !== prevProps.setName) {
      this.setState({
        setName: this.props.setName
      })
    }
  }

  setName = event => {
    const setName = event.target.value;

    this.setState({ setName });
    this.props.editSetName(setName)
  }

  addTerm = event => {
    event.preventDefault();
    this.props.addNewTerm();
  }

  render() {
    const { setName } = this.state;
    const isFilled = setName ? true : false;
    const {
      terms,
      uid,
      setid,
      isEditSubmited,
      isSetDeleted,
      isOverlayOpen,
      updateTerm,
      removeTerm,
      submitEditSet,
      askForDeleting,
      deleteEditSet,
      deleteSetChanges,
      notificationError
    } = this.props;

    if (!uid) return <Redirect to={`/sets/${setid}`} />;
    if (isEditSubmited) return <Redirect to={`/sets/${setid}`} />
    if (isSetDeleted) return <Redirect to="/" />

    if (isOverlayOpen) {
      return (
        <DeleteSetOverlay
          isEdited
          deleteSet={deleteEditSet}
          deleteSetChanges={deleteSetChanges}
          askForDeleting={askForDeleting}
         />
      )
    } else {
      return (
        <Main width={80} maxWidth={450}>
          <Form>
            <SetName>
              <NameInput
                value={setName}
                maxLength="40"
                onChange={this.setName}
              />
              <NameLabel
                isFilled={isFilled}
                htmlFor="name"
              >
                Name your set
              </NameLabel>
              <Border isBig="true" />
            </SetName>

            <Buttons
              setName={setName}
              terms={terms}
              askForDeleting={askForDeleting}
              submitSet={submitEditSet}
              notificationError={notificationError}
            />

            <TermsListWrapper>
              <TermsList
                terms={terms}
                updateTerm={updateTerm}
                removeTerm={removeTerm}
              />
            </TermsListWrapper>

            <AddButton onClick={this.addTerm}>add term</AddButton>
          </Form>

        </Main>
      );
    }
  }
}

const Buttons = ({
  setName,
  terms,
  askForDeleting,
  submitSet,
  notificationError
}) => {

  const reduceTerms = terms => {
    return terms
      .map(element => {
        return {
          ...element,
          term: element.term.trim(),
          definition: element.definition.trim()
        }
      })
      .map(element => {
        const { term, definition } = element;

        if (
          (/^\s$/.test(term) || term.length === 0) &&
          (/^\s$/.test(definition) || definition.length === 0)
        ) {
          return null

        } else if (/^\s$/.test(term) || term.length === 0) {
          return {...element, term: '...' };

        } else if (/^\s$/.test(definition) || definition.length === 0) {
          return {...element, definition: '...' };

        } else {
          return element
        }
      })
      .filter(element => element)
  }

  const handleSubmitSet = (event) => {
    const reducedTerms = reduceTerms(terms);
    event.preventDefault();

    if (!setName || /^\s$/.test(setName)) {
      notificationError('You must enter a title to save your set');

    } else if (reducedTerms.length < 2) {
      notificationError('You have to create at least 2 terms');

    } else {
      submitSet(reducedTerms);
    }
  }

  const handleDeleteSet = (event) => {
    event.preventDefault();
    askForDeleting(true)
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
  position: absolute;
  bottom: 2px;
  left: 2px;
  font-size: 20px;
  color: ${colors.azure};
  transition: opacity 0.1s;
  z-index: -1;

  ${props => props.isFilled && css `
    opacity: 0;
  `}
`;

const NameInput = styled(BasicInput)`
  padding: 2px;
  width: 100%;
  font-size: 2rem;
  outline-color: ${colors.blue};
  color: ${colors.white};

  &:focus + ${NameLabel} {
    opacity: 0;
  }
`;

const Border = styled.div`
  width: 100%;
  height: 2px;
  background: ${colors.white};
  position: absolute;
  bottom: ${props => props.isBig ? '-2px' : '10px'};
  left: 0;
`;

const ButtonsWrapper = styled.div`
  margin: 40px auto 60px auto;
  display: flex;
  justify-content: space-evenly;
  max-width: 300px;

  ${'' /* @media (min-width: 768px) {
    ${props => props.iseditable ? 'justify-content: space-between' : false };
  } */}
`;

const Form = styled.form`
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


export default EditSet
