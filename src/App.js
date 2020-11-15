import React from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import MainLayout from './components/Layout/Layout';
import './App.css';

const App = () => (
  <Router> 
    <Switch>
      <Route exact path="/">{<Redirect to="/login" />}</Route>
      <Route exact path="/dashboard/*" component={MainLayout} /> 
      <Route exact path="/login" component={Login} />
    </Switch>
  </Router>
);

export default App;