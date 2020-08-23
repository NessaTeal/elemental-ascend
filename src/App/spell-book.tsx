import React from 'react';
import { useState } from './context';
import Spell from './spell';

const SpellBook: React.FC = () => {
  const { spells, currentSpell } = useState();

  return (
    <div className={'spell-book'}>
      {spells.map((s, index) => (
        <Spell key={index} {...s} active={index === currentSpell} />
      ))}
    </div>
  );
};

export default SpellBook;
