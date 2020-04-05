import React, {Component} from 'react';
import { Provider } from 'react-redux'
import store from './store.js';
import PrivateRoute from './components/common/PrivateRoute.js';
import './App.css';
import AddSupply from './components/AddSupply.js';
import Landing from './components/Landing.js';
import LoginRegister from './components/LoginRegister.js';
import SupplyList from './components/SupplyList.js';
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
            <LoginRegister/>
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
    </Provider>
  );
  }
}

export default App;
