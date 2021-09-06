import './style.css';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Game from './pages/game';
import MainMenu from './pages/main-menu';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <MainMenu />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/about">
            <div>A good game :3</div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
