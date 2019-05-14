import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';


class ViewSet extends Component {
  render() {
    const { match, set } = this.props;
    if (set) {
      return (
        <div>
          <div>
            <h2>{ set.name }</h2>
            <p>{ set.terms.length } terms</p>
            <p>by { set.author }</p>
          </div>

          <div>
            <Link to={ `/edit/${match.params.id}` }>edit set</Link>
            <Link to={ `/learn/${match.params.id}` }>learn set</Link>
          </div>

          <div>
            <h3>terms</h3>
            <ul>
              {set.terms.map(term =>
                <li key={ term.termId }>
                  <span>{ term.termId + 1 }</span>
                  <div>
                    <p>{ term.english }</p>
                    <p>{ term.polish }</p>
                  </div>
                  <hr/>
                </li>
              )}
            </ul>
          </div>
        </div>

      )
    } else {
      return (
        <div></div>
      )
    }
  }
}


const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const sets = state.firestore.data.sets;
  const set = sets ? sets[id] : null;
  return ({
    set: set
  })
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'sets' }
  ])
)(ViewSet);
