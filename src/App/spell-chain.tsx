import React from 'react';
import { useState } from './context';
import SpellSlot from './spell-slot';

const SpellChain: React.FC = () => {
  const { spellSlots, currentSlot } = useState();

  return (
    <>
      <h3>Spell chain</h3>
      <p>
        After casting, next slot will be used that is more powerful with rolling
        over to first one
      </p>
      <div className={'spell-chain'}>
        {spellSlots.map((s, index) => (
          <SpellSlot key={index} {...s} active={index === currentSlot} />
        ))}
      </div>
    </>
  );
};

export default SpellChain;
