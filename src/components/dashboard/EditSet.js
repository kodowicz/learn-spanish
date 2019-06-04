import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { changeLocation, changeLastLocation } from '../../store/actions/locationActions';
import { editSetName, updateTerm, addNewTerm, submitEditedSet } from '../../store/actions/editSetActions';
import { Redirect } from 'react-router-dom';

import styled, { css } from 'styled-components';
import { Button, Main, BlockShadow, BasicInput, colors } from '../../assets/styles/GlobalStyles';


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
    padding: 0px 0;
    outline-color: ${colors.blue}
  `;


class EditSet extends Component {
  state = {
    setName: "",
    redirect: false
  }

  componentDidMount() {
    this.props.changeLocation('edit');
    this.props.changeLastLocation("/");
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      setName: newProps.setName
    })
  }

  setName = event => {
    this.setState({
      setName: event.target.value
    })
  }

  addTerm = event => {
    event.preventDefault();
    this.props.addNewTerm();
    console.log('added');
  }

  submitName = () => {
    this.props.editSetName(this.state.setName)
  }

  submitSet = event => {
    event.preventDefault();
    // this.setState({ redirect: true });
    this.props.submitEditedSet(true)
  }

  render() {
    const { author, signedUser, setId, terms, isNewTerm, updateTerm } = this.props;
    const { setName, redirect } = this.state;
    const isFilled = setName ? true : false;

    // if (signedUser !== author) return <Redirect to={`/sets/${setId}`} />;
    if (this.props.isEditSubmited) return <Redirect to={`/sets/${setId}`} />

    return (
      <Main>
        <SetName>
          <NameInput value={setName} onChange={this.setName} onBlur={this.submitName} />
          <NameLabel isFilled={isFilled} htmlFor="name">Name your set</NameLabel>
          <Border isBig="true" />
        </SetName>

        <Form>
          { terms ?
              <>
                <TermList
                  terms={terms}
                  updateTerm={updateTerm}
                />
              </>
            :
            <></>
          }
          <AddButton onClick={this.addTerm}>add term</AddButton>
          <SubmitButton onClick={this.submitSet}>done</SubmitButton>
        </Form>

      </Main>
    );
  }
}

class TermList extends Component {

  render() {
    const { terms, updateTerm } = this.props;
    const lastTerm = terms.length - 1;

    return (
      <>
        {terms.map((term, index) => {
          if (index === lastTerm) {
            return <Term
              termDetails={term}
              key={term.id}
              updateTerm={updateTerm}
              focused={true} />
          } else {
            return <Term termDetails={term} key={term.id} updateTerm={updateTerm} />
          }

        })}
      </>
    );
  }
}

class Term extends Component {
  state = {
    term: "",
    definition: "",
    id: null
  }

  componentDidMount () {
    if (this.props.termDetails) {
      const { definition, term, id } = this.props.termDetails;
      this.setState({
        term,
        definition,
        id
      })
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    }, () => this.props.updateTerm(this.state));
  }

  render() {
    return (
      <TermWrapper>
        <DefineTerm>
          <Input
            autoFocus={this.props.focused ? true : false}
            id="term"
            tabIndex={this.props.index}
            value={this.state.term}
            onChange={this.handleChange}
          />
          <Label htmlFor="term">term</Label>
          <Border />
        </DefineTerm>
        <DefineTerm>
          <Input
            id="definition"
            tabIndex={this.props.index}
            value={this.state.definition}
            onChange={this.handleChange}
          />
          <Label htmlFor="definition">definition</Label>
          <Border />
        </DefineTerm>
      </TermWrapper>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const set = state.firestore.data.set ? state.firestore.data.set[id] : null;
  const authorId = set ? set.authorId : null;
  const terms =  state.firestore.ordered.terms;
  const name = set ? set.name : null;

  return ({
    location: state.location,
    lastLocation: state.lastLocation,
    signedUser: state.firebase.auth.uid,
    author: authorId,
    setId: id,
    terms: terms,
    setName: name,
    isNewTerm: state.isNewTerm,
    isEditSubmited: state.isEditSubmited
  })
}

export default compose(
  connect(
    mapStateToProps,
    {
      editSetName,
      updateTerm,
      addNewTerm,
      submitEditedSet,
      changeLocation,
      changeLastLocation
    }
  ),
  firestoreConnect(props => [
    {
      collection: 'sets',
      doc: props.match.params.id,
      storeAs: 'set'
    },
    {
      collection: 'sets',
      doc: props.match.params.id,
      subcollections: [{ collection: 'terms' }],
      storeAs: 'terms',
      orderBy: ["time"]
    }
  ])
)(EditSet);
