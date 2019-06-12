import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import styled, { css } from 'styled-components';
import { Button, Main, BlockShadow, BasicInput, colors } from '../../assets/styles/GlobalStyles';
import removeButton from '../../assets/images/remove.png';


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

const Wrapper = styled.div`
  display: grid;
  grid-template: 1fr / 1fr 80px
  margin: 25px 0;
`

const TermWrapper = styled(BlockShadow)`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  padding: 5px 20px 25px 20px;
  transition: transform 0.1s ease-out;
  transform: ${props => `translateX(${props.isMoved}px)`};
  background: white
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

const DeleteButton = styled.button`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  background: none;
  border: none;
  padding: 0;
  display: ${ props => props.isMoved ? 'block' : 'none' }
`


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
    this.setState({ state: this.state });
  }

  submitName = () => {
    this.props.editSetName(this.state.setName)
  }

  submitSet = event => {
    event.preventDefault();
    this.props.submitEditedSet(true)
  }

  render() {
    const { setId, terms, updateTerm, removeTerm } = this.props;
    const { setName } = this.state;
    const isFilled = setName ? true : false;

    // if (signedUser !== author) return <Redirect to={`/sets/${setId}`} />;
    if (this.props.isEditSubmited) return <Redirect to={`/sets/${setId}`} />

    console.log('updated firestore');

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
    );
  }
}

class TermList extends Component {

  render() {
    const { terms, updateTerm, removeTerm } = this.props;
    const lastTerm = terms.length - 1;

    return (
      <>
        {terms.map((term, index) => {
          if (index === lastTerm) {
            return (
              <Term
                key={term.id}
                termDetails={term}
                updateTerm={updateTerm}
                focused={true}
                removeTerm={removeTerm}
              />
            )
          } else {
            return (
              <Term
                key={term.id}
                termDetails={term}
                updateTerm={updateTerm}
                removeTerm={removeTerm}
              />
            )
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
    id: null,
    firstTouch: null,
    lastTouch: null,
    currentTouch: null,
    isDeleted: false,
    isMoved: 0
  };

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

  handleTouchStart = event => {
    this.setState({
      lastTouch: event.targetTouches[0].clientX,
      firstTouch: event.targetTouches[0].clientX
    })
  }

  handleTouchMove = event => {
    const currentTouch = event.targetTouches[0].clientX;

    this.setState(() => ({
      currentTouch
    }), () => {
      let isDeleted = null;
      let isMoved = 0;

      isMoved = -(this.state.firstTouch - this.state.currentTouch);

      if (this.state.lastTouch > this.state.currentTouch) {
        isDeleted = true;
        if (isMoved <= -80) {
          isMoved = -80
        } else if (isMoved > 0) {
          isMoved = 0
        }

      } else if (this.state.lastTouch < this.state.currentTouch) {
        isDeleted = false;
        if (isMoved >= 0) {
          isMoved = 0
          // TODO: moving back too fast
        } else if (isMoved < -80) {
          isMoved = -80
        }
      }

      this.setState({
        isDeleted,
        isMoved,
        lastTouch: currentTouch
      })
    })
  }

  handleTouchEnd = event => {
    if (this.state.isMoved < -40) {
      this.setState({
        isMoved: -80
      })
    } else {
      this.setState({
        isMoved: 0
      })
    }

    // if (this.state.isDeleted) {
    //   console.log('remove');
    // }
  }

  removeElement = event => {
    event.preventDefault();
    this.props.removeTerm(this.state.id);
  }

  render() {
    const { isMoved } = this.state;
    return (
      <Wrapper>
        <TermWrapper
          isMoved={isMoved}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
        >
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
        <DeleteButton
          isMoved={isMoved}
          onClick={this.removeElement}
        >
          <img src={removeButton} alt="remove" />
        </DeleteButton>
      </Wrapper>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const set = state.firestore.data.set ? state.firestore.data.set[id] : null;
  const authorId = set ? set.authorId : null;
  const terms =  state.firestore.ordered.terms;
  const name = set ? set.name : null;

  console.log(state.firestore.ordered.terms);

  return ({
    location: state.location,
    lastLocation: state.lastLocation,
    signedUser: state.firebase.auth.uid,
    author: authorId,
    setId: id,
    terms: terms,
    setName: name,
    isNewTerm: state.isNewTerm,
    isTermDeleted: state.isTermDeleted,
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
      removeTerm,
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
