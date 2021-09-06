import React from 'react';
import { Link } from 'react-router-dom';

const MainMenu = (): JSX.Element => {
  return (
    <>
      <h1>Wanabe main menu</h1>
      <Link to="/game">Show me the game</Link>
    </>
  );
};

export default MainMenu;
