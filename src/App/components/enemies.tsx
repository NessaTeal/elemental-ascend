import React from 'react';
import { useState, useDispatch, CastSpellAction } from '../context';
import Enemy from './enemy';
import { getEnemy, getSpell } from '../../resources';
import { executeAnimatedAction } from '../../resources/actions';

const Enemies: React.FC = () => {
  const state = useState();
  const { enemies, currentSpell } = state;
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
          const animation = getSpell(currentSpell)
            .getActionWrapper()
            .getAnimation(action, state);
          return (
            <Enemy
              key={index}
              {...e}
              actionDescription={getEnemy(e.name).getActionDescription(e)}
              onClick={() => executeAnimatedAction(animation, action, dispatch)}
            />
          );
        })}
      </div>
    </>
  );
};

export default Enemies;
