import React, { Component } from 'react';
import Term from './Term';

class TermsList extends Component {
  componentDidMount () {
    if (this.props.terms.length < 2 && this.props.basicTwoTerms) {
      this.props.basicTwoTerms(2);
    }
  }

  render() {
    const { terms, updateTerm, removeTerm } = this.props;
    const lastTerm = terms.length - 1;

    return (
      <>
        {terms.map((term, index) => {
            if (index === lastTerm) {
              return (
                <Term
                  termDetails={term}
                  key={term.id}
                  updateTerm={updateTerm}
                  removeTerm={removeTerm}
                  focused={true}
                />
              )
            } else {
              return (
                <Term
                  termDetails={term}
                  key={term.id}
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

export default TermsList
