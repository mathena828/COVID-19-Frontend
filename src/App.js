import React, {Component, Fragment} from 'react';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'; 
import { Provider } from 'react-redux'

import store from './store.js';
import PrivateRoute from './components/common/PrivateRoute.js';
import './App.css';
import AddSupply from './components/AddSupply.js';
import Landing from './components/Landing.js';
import SupplyList from './components/SupplyList.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Navigation from './components/layout/Navigation.js';
import Alerts from './components/layout/Alerts.js';
import Footer from './components/layout/Footer.js';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { loadUser } from './actions/auth.js';


// Alert Options
const alertOptions = {
  timeout: 3000,
  position: 'top center',
};


class App extends Component {
  componentDidMount(){
    store.dispatch(loadUser());
  }
  render(){
  return (
    <Provider store ={store}>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
    <Router>
      <div className="App">
        <Fragment>
          <Navigation/>
          <Alerts/>
        <Switch>
          
          <Route exact path="/">
            <Landing/>
          </Route>
          <PrivateRoute path="/supply-list" component={SupplyList}/>
          <Route path="/add-supply">
            <AddSupply/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
        </Switch>
        <Footer/>
        </Fragment>
      </div>
    </Router>
    </AlertProvider>
    </Provider>
  );
  }
}

export default App;
