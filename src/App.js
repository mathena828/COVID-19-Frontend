import React from 'react';
import './App.css';
import AddSupply from './components/AddSupply.js';
import Landing from './components/Landing.js';
import LoginRegister from './components/LoginRegister.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
