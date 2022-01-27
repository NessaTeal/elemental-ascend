import React from 'react';

import { getSpellDefinition } from '../../resources';
import { useDispatch, useState } from '../context';
import SpellCard from './spell-card';

const SpellBook = (): JSX.Element => {
  const state = useState();
  const { spellCards, currentSpellCard } = state;
  const dispatch = useDispatch();

  return (
    <>
      <h3>Spell book</h3>
      <p>Click to change spell</p>
      <div className={'spell-book'}>
        {spellCards.map((spellCard, index) => (
          <SpellCard
            key={index}
            active={index === currentSpellCard}
            description={spellCard.spells
              .map(
                (s) =>
                  `${s.name}:\n${getSpellDefinition(s).getDescription(
                    state,
                    s,
                  )}`,
              )
              .join('\n\n')}
            onClick={() =>
              dispatch({ type: 'changeSpellCard', spellCard: index })
            }
          />
        ))}
      </div>
    </>
  );
};

export default SpellBook;
