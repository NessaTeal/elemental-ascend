import React from 'react';
import { useState, useDispatch, CastSpellAction } from '../context';
import Enemy from './enemy';
import { getEnemy, getSpell } from '../../resources';
import { makeATurn } from '../../resources/actions';

const Enemies: React.FC = () => {
  const state = useState();
  const { enemies, spells, currentSpell, playerTurn } = state;
  const dispatch = useDispatch();

  return (
    <>
      <h3>Enemies</h3>
      <p>
        Click an enemy to cast currently selected spell with the current slot
      </p>
      <div className="enemies">
        {enemies.map((e, index) => {
          const action: CastSpellAction = { type: 'castSpell', target: index };
          const animation = getSpell(spells[currentSpell].name).getAnimation(
            action,
            state,
          );
          return (
            <Enemy
              key={index}
              {...e}
              actionDescription={getEnemy(e.name)
                .getActionWrappers()
                [e.currentAction].getDescription(state, e)}
              onClick={() => {
                if (playerTurn) {
                  makeATurn(animation, action, dispatch);
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
