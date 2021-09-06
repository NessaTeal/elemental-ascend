import React from 'react';

import { getSpellDefinition } from '../../resources';
import { useDispatch, useState } from '../context';
import Spell from './spell';

const SpellBook = (): JSX.Element => {
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
            description={getSpellDefinition(s).getDescription(
              state,
              spells[index],
            )}
            onClick={() => dispatch({ type: 'changeSpell', spell: index })}
          />
        ))}
      </div>
    </>
  );
};

export default SpellBook;
