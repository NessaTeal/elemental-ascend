import React from 'react';

import Enemies from '../components/enemies';
import Player from '../components/player';
import SpellBook from '../components/spell-book';
import SpellChain from '../components/spell-chain';

const Game: React.FC = () => {
  return (
    <>
      <div className="scene" id="scene">
        <Player />
        <Enemies />
      </div>
      <SpellChain />
      <SpellBook />
    </>
  );
};

export default Game;
