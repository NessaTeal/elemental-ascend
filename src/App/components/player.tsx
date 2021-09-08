import React from 'react';

import { useState } from '../context';

const Player = (): JSX.Element => {
  const { playerHealth } = useState();

  return (
    <div className="player" id="player">
      <div>Player</div>
      {playerHealth < -1000000000 ? (
        <div>Come on, I said you are dead!</div>
      ) : playerHealth > 0 ? (
        <div>HP: {playerHealth}</div>
      ) : (
        <div>You are very dead</div>
      )}
    </div>
  );
};

export default Player;
