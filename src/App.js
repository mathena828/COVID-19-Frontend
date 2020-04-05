import React, {Component, Fragment} from 'react';
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
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { loadUser } from './actions/auth.js';

class App extends Component {
  componentDidMount(){
    store.dispatch(loadUser());
  }
  render(){
  return (
    <Provider store ={store}>
    <div>
    <Router>
      <div className="App">
        <Fragment>
          <Navigation/>

        <Switch>
          
          <Route exact path="/">
            <Landing/>
          </Route>
          <PrivateRoute path="/supply-list">
            <SupplyList/>
          </PrivateRoute>
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
        </Fragment>
      </div>
    </Router>
    </div>
    </Provider>
  );
  }
}

export default App;
