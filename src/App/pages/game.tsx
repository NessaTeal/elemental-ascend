import React from 'react';
import Enemies from '../components/enemies';
import SpellChain from '../components/spell-chain';
import SpellBook from '../components/spell-book';
import Player from '../components/player';

const Game: React.FC = () => {
  return (
    <>
      <Enemies />
      <Player />
      <SpellChain />
      <SpellBook />
    </>
  );
};

export default Game;
