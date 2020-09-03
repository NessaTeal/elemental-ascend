import React from 'react';
import { useState, useDispatch } from '../context';
import Spell from './spell';
import { getSpell } from '../../resources';

const SpellBook: React.FC = () => {
  const state = useState();
  const { spells, currentSpell } = state;
  const dispatch = useDispatch();

  return (
    <>
      <h3>Spell book</h3>
      <p>Click to change spell</p>
      <div className={'spell-book'}>
        {spells.map((s, index) => (
          <Spell
            key={index}
            {...s}
            active={index === currentSpell}
            description={getSpell(s.name)
              .getActionWrapper()
              .getDescription(state, spells[index])}
            onClick={() => dispatch({ type: 'changeSpell', spell: index })}
          />
        ))}
      </div>
    </>
  );
};

export default SpellBook;
