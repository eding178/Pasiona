import React, { Component } from 'react';
import './App.css';
import Home from "./home.js";
import AddPlayer from "./AddPlayer.js";
import { BrowserRouter as Router, Link, Route, Switch,} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <ul className="list-group">
            <li className="list-group-item list-group-item-success">
              <Link to="/addPlayer">Add Player</Link>
            </li>
            <li className="list-group-item list-group-item-success">
              <Link to="/home">Home</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/addPlayer" >
            <AddPlayerMethod />
          </Route>
          <Route exact path="/home">
            <HomeMethod />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function HomeMethod() {
  return <Home />
}
function AddPlayerMethod() {
  return <AddPlayer />
}

export default App;
