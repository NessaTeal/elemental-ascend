import React from 'react';
import cx from 'classnames';
import { useState } from './context';

export type SpellType = 'Fireball' | 'Lightning strike' | 'Shadow bolt';

export interface SpellProps {
  type: SpellType;
  power: number;
  active?: boolean;
  onClick?: () => void;
}

const Spell: React.FC<SpellProps> = ({
  type,
  power,
  active,
  onClick,
}: SpellProps) => {
  const { spellSlots, currentSlot } = useState();
  const slotPower = spellSlots[currentSlot].power;

  return (
    <div className={cx('spell', { active })} onClick={onClick}>
      <p>{type}</p>
      <p>{getSpellDescription(type, power, Math.ceil(slotPower * power))}</p>
    </div>
  );
};

const getSpellDescription = (
  spellType: SpellType,
  rawPower: number,
  totalPower: number,
) => {
  switch (spellType) {
    case 'Fireball': {
      return `Deal ${rawPower}(${totalPower}) damage to the enemy`;
    }
    case 'Lightning strike': {
      return `Deal ${Math.ceil(rawPower * 0.85)} (${Math.ceil(
        totalPower * 0.85,
      )}) to the enemy and ${Math.ceil(rawPower * 0.25)} (${Math.ceil(
        totalPower * 0.25,
      )}) to another random one`;
    }
    case 'Shadow bolt': {
      return `Inflict one curse stack to the enemy and deal ${rawPower} (${totalPower}) damage per each`;
    }
  }
};

export const createSpell = (type: SpellType, power: number): SpellProps => {
  return {
    type,
    power,
  };
};

export default Spell;
