import React from 'react';
import Enemies from '../components/enemies';
import SpellChain from '../components/spell-chain';
import SpellBook from '../components/spell-book';

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
