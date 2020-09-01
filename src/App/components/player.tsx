import React from 'react';
import { useState } from '../context';

const Player: React.FC = () => {
  const { playerHealth } = useState();

  return <div className="player">HP: {playerHealth}</div>;
};

export default Player;
