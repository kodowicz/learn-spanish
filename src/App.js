import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Login from './components/navbar/Login';
import ViewProfile from './components/navbar/ViewProfile';
import HomePage from './containers/HomePageContainer';
import ViewSet from './containers/ViewSetContainer';
import EditSet from './containers/EditSetContainer';
import CreateSet from './containers/CreateSetContainer';
import LearnSet from './containers/LearnSetContainer';
import TestCollection from './containers/TestCollection';
import TestSubcollection from './containers/TestSubcollection';

import { GlobalStyle } from './assets/styles/GlobalStyles';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <GlobalStyle />
          <Route component={Navbar} />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/sets/:id" component={ViewSet} />
            <Route path="/edit/:id" component={EditSet} />
            <Route path="/create" component={CreateSet} />
            <Route path="/learn/:id" component={LearnSet} />
            <Route path="/signup" component={Login} />
            <Route path="/profile/:user" component={ViewProfile} />
            <Route path="/collection" component={TestCollection} />
            <Route path="/subcollection" component={TestSubcollection} />
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default App
