import React from 'react';

import { useState } from '../context';

const Player: React.FC = () => {
  const { playerHealth } = useState();

  return (
    <div className="player" id="player">
      <div>Player</div>
      <div>HP: {playerHealth}</div>
    </div>
  );
};

export default Player;
