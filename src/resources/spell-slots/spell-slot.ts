export type SpellSlotState = {
  power: number;
  effects: string[];
};

export type SpellSlotStorage = {
  name: string;
  starting: boolean;
  spellSlot: SpellSlotState;
};

export default function importspellSlots(): SpellSlotStorage[] {
  const modules = require.context('./data', true, /.*json$/);
  const spellSlots: SpellSlotStorage[] = [];

  modules.keys().forEach((m) => {
    const [, startingStr, name] = m.split('/');
    const spellSlot = modules(m);
    const starting = startingStr === 'starting';
    spellSlots.push({ name, starting, spellSlot });
  });

  return spellSlots;
}
