import { GameDispatch, State } from '../App/context';
import { getSpellDefinition } from '.';
import { SpellState } from './spells/spell';

export type SpellCard = {
  spells: SpellState[];
};

export function getSpellCardDescription(
  spellCard: SpellCard,
  state: State,
): string {
  return spellCard.spells
    .map((s) => getSpellDefinition(s).getDescription(state, s))
    .join('\n\n');
}
