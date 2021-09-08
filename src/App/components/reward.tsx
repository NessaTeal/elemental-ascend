import React from 'react';

import { RewardState } from '../../resources/rewards/reward';

export interface RewardProps extends RewardState {
  actionDescription: string;
  onClick: () => void;
}

const Reward = ({
  name,
  actionDescription,
  onClick,
}: RewardProps): JSX.Element => {
  return (
    <div className="reward" onClick={onClick}>
      <div className="top">{name}</div>
      <div className="mid">{actionDescription}</div>
    </div>
  );
};

export default Reward;
