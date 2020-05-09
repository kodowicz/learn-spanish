import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './containers/NavbarContainer';
import Login from './containers/LoginContainer';
import ViewProfile from './containers/ViewProfileContainer';
import HomePage from './containers/HomePageContainer';
import ViewSet from './containers/ViewSetContainer';
import EditSet from './containers/EditSetContainer';
import CreateSet from './containers/CreateSetContainer';
import LearnSet from './containers/LearnSetContainer';
import PlaySet from './containers/PlaySetContainer';
import NotFoundPage from './pages/404';
import Background from './components/Background';
import { GlobalStyle } from './assets/styles/GlobalStyles';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route component={Navbar} />
        <Background>
          <GlobalStyle />
          <Switch>
            <Route path="/" exact component={HomePage} />
              <Route path="/sets/:id" component={ViewSet} />
              <Route path="/edit/:id" component={EditSet} />
              <Route path="/create" component={CreateSet} />
              <Route path="/learn/:id" component={LearnSet} />
              <Route path="/play/:id" component={PlaySet} />
            <Route path="/signup" component={Login} />
            <Route path="/profile/:user" component={ViewProfile} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Background>
      </BrowserRouter>
    );
  }
}

export default App
