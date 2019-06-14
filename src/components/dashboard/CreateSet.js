import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TermsList from './TermsList';

import styled, { css } from 'styled-components';
import { Button, Main, BasicInput, colors } from '../../assets/styles/GlobalStyles';


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

  render() {
    const { auth, unsavedSetTerms, newSetKey, updateUnsavedTerm, removeUnsavedTerm } = this.props;
    const { setName } = this.state;
    const isFilled = setName ? true : false;

    if (!auth.uid) return <Redirect to="/signup" />;
    if (newSetKey) return <Redirect to={`/sets/${newSetKey}`} />

    return (
      <Main>
        <SetName>
          <NameInput value={setName} onChange={this.setName} onBlur={this.submitName} />
          <NameLabel isFilled={isFilled} htmlFor="name">Name your set</NameLabel>
          <Border isBig="true" />
        </SetName>

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
          <SubmitButton onClick={this.submitSet}>done</SubmitButton>
        </Form>

      </Main>
    )
  }
}

// class UnsavedTerms extends Component {
//   componentDidMount () {
//     if (this.props.unsavedSetTerms.length < 2) {
//       this.props.basicTwoTerms(2)
//     }
//   }
//
//   render() {
//     const { unsavedSetTerms, updateTerm, removeTerm } = this.props;
//     const lastTerm = unsavedSetTerms.length - 1;
//
//     return (
//       <>
//         {unsavedSetTerms.map((term, index) => {
//             if (index === lastTerm) {
//               return (
//                 <Term
//                   termDetails={term}
//                   key={term.id}
//                   updateTerm={updateTerm}
//                   removeTerm={removeTerm}
//                   focused={true}
//                 />
//               )
//             } else {
//               return (
//                 <Term
//                   termDetails={term}
//                   key={term.id}
//                   updateTerm={updateTerm}
//                   removeTerm={removeTerm}
//                 />
//               )
//             }
//
//         })}
//       </>
//     );
//   }
// }


export default CreateSet
