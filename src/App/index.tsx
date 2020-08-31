import React from 'react';
import './style.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainMenu from './pages/main-menu';
import Game from './pages/game';

const App: React.FC = () => {
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
        </Switch>
      </Router>
    </div>
  );
};

export default App;
