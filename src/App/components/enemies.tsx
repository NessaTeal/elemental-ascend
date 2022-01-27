import React from 'react';

import { getEnemy } from '../../resources';
import { makeATurn } from '../../resources/actions';
import { useDispatch, useState } from '../context';
import Enemy from './enemy';

const Enemies = (): JSX.Element => {
  const state = useState();
  const { enemies, playerTurn } = state;
  const dispatch = useDispatch();

  return (
    <>
      <div className="enemies">
        {enemies.map((e) => {
          return (
            <div key={e.id} id={e.id}>
              <Enemy
                {...e}
                actionDescription={getEnemy(e)
                  .getActionWrappers()
                  [e.currentAction].getDescription(state, e)}
                onClick={() => {
                  if (playerTurn) {
                    makeATurn(e.id, dispatch);
                  }
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Enemies;
