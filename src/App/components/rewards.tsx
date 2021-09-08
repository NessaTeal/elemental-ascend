import React from 'react';

import { getReward } from '../../resources';
import { useDispatch, useState } from '../context';
import Reward from './reward';

const Rewards = (): JSX.Element => {
  const state = useState();
  const { rewards, playerTurn } = state;
  const dispatch = useDispatch();

  return (
    <div className="rewards">
      {rewards.map((r, index) => {
        return (
          <div key={r.name} id={`enemy-${index}`}>
            <Reward
              {...r}
              actionDescription={getReward(r).getDescription()}
              onClick={() => {
                if (playerTurn) {
                  getReward(r).take(dispatch);
                }
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Rewards;
