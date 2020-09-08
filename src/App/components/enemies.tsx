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
      <h3>Enemies</h3>
      <p>
        Click an enemy to cast currently selected spell with the current slot
      </p>
      <div className="enemies">
        {enemies.map((e, index) => {
          return (
            <Enemy
              key={index}
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
          );
        })}
      </div>
    </>
  );
};

export default Enemies;
