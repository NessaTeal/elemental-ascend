import React from 'react';
import { useState, useDispatch } from './context';
import Spell from './spell';

const SpellBook: React.FC = () => {
  const { spells, currentSpell } = useState();
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
            active={s.type === currentSpell}
            onClick={() => dispatch({ type: 'changeSpell', spellType: s.type })}
          />
        ))}
      </div>
    </>
  );
};

export default SpellBook;
