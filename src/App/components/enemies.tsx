import React from 'react';

import { getEnemy } from '../../resources';
import { makeATurn } from '../../resources/actions';
import { useDispatch, useState } from '../context';
import Enemy from './enemy';

const Enemies: React.FC = () => {
  const state = useState();
  const { enemies, playerTurn } = state;
  const dispatch = useDispatch();

  return (
    <>
      <div className="enemies">
        {enemies.map((e, index) => {
          return (
            // key should be super unique id
            <div key={e.name} id={`enemy-${index}`}>
              <Enemy
                {...e}
                actionDescription={getEnemy(e)
                  .getActionWrappers()
                  [e.currentAction].getDescription(state, e)}
                onClick={() => {
                  if (playerTurn) {
                    makeATurn(index, dispatch);
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
