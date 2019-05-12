import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import SignUp from './components/navbar/SignUp';
import Home from './components/dashboard/Home';
import ViewSet from './components/dashboard/ViewSet';
import EditSet from './components/dashboard/EditSet';
import CreateSet from './components/dashboard/CreateSet';
import LearnSet from './components/dashboard/LearnSet';
import ViewProfile from './components/dashboard/ViewProfile';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route component={Navbar} />
          <hr />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/sets/:id" component={ViewSet} />
            <Route path="/edit/:id" component={EditSet} />
            <Route path="/create" component={CreateSet} />
            <Route path="/learn/:id" component={LearnSet} />
            <Route path="/signup" component={SignUp} />
            <Route path="/profile/:user" component={ViewProfile} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App
