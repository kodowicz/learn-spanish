import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from '../containers/NavbarContainer';
import Login from '../containers/LoginContainer';
import ViewProfile from '../containers/ViewProfileContainer';
import HomePage from '../containers/HomePageContainer';
import ViewSet from '../containers/ViewSetContainer';
import EditSet from '../containers/EditSetContainer';
import CreateSet from '../containers/CreateSetContainer';
import LearnSet from '../containers/LearnSetContainer';
import PlaySet from '../containers/PlaySetContainer';
import Notification from '../containers/NotificationContainer';
import NotFoundPage from './404';
import Background from '../components/Background';
import { GlobalStyle } from '../assets/styles/GlobalStyles';


const App = () => (
  <BrowserRouter>
    <Route component={Navbar} />
    <Route component={Notification} />
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

export default App
