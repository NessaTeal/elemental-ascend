import React from 'react';
import { useState, useDispatch } from '../context';
import Enemy from './enemy';
import { getEnemy } from '../../resources';
import { makeATurn } from '../../resources/actions';

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
                actionDescription={getEnemy(e.name)
                  .getActionWrappers()
                  [e.currentAction].getDescription(state, e)}
                onClick={() => {
                  if (playerTurn) {
                    makeATurn(index, state, dispatch);
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
