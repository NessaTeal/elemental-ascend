import React from 'react';

import Enemies from '../components/enemies';
import Player from '../components/player';
import Rewards from '../components/rewards';
import SpellBook from '../components/spell-book';
import SpellChain from '../components/spell-chain';
import { useState } from '../context';

const Game = (): JSX.Element => {
  const { rewards } = useState();

  return (
    <>
      <div className="scene" id="scene">
        <Player />
        {rewards.length > 0 ? <Rewards /> : <Enemies />}
      </div>
      <SpellChain />
      <SpellBook />
    </>
  );
};

export default Game;
