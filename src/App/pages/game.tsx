import React from 'react';
import Enemies from '../enemies';
import SpellChain from '../spell-chain';
import SpellBook from '../spell-book';

const Game: React.FC = () => {
  return (
    <>
      <Enemies />
      <SpellChain />
      <SpellBook />
    </>
  );
};

export default Game;
