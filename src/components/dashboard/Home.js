import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class Home extends Component {
  render() {
    return (
      <Main>
        <Title>flashcards</Title>
        {this.props.sets && <Sets sets={this.props.sets} />}
        <Button>
          <Link to="/create">
            <div>add new set</div>
          </Link>
        </Button>
      </Main>
    );
  }
}


class Sets extends Component {
  render() {
    return (
      <List>
        { this.props.sets.map(set =>
          <ListItem key={ set.id }>
            <Link to={`/sets/${set.id}`}>
              <SetWrapper>
                <Topic>{ set.name }</Topic>
                <Amount>{ set.terms.length } terms</Amount>
                <Author>by { set.author }</Author>
              </SetWrapper>
            </Link>
          </ListItem>
        )}
      </List>
    )
  }
};

const mapStateToProps = state => {
  console.log(state);
  return({
  sets: state.firestore.ordered.sets
})}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'sets' }
  ])
)(Home);
