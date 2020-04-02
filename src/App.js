import React from 'react';
import logo from './logo.svg';
import './App.css';
import AddSupply from './components/AddSupply.js';
import Landing from './components/Landing.js';
import LoginRegister from './components/LoginRegister.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Landing/>
          </Route>
          <Route path="/add-supply">
            <AddSupply/>
          </Route>
          <Route path="/login">
            <LoginRegister/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
