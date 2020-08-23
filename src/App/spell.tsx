import React from 'react';
import cx from 'classnames';
import { useState } from './context';

export type SpellType = 'fireball' | 'lightning_strike' | 'shadow_bolt';

export interface SpellProps {
  name: string;
  type: SpellType;
  power: number;
  active?: boolean;
  onClick?: () => void;
}

const Spell: React.FC<SpellProps> = ({
  name,
  type,
  active,
  power,
  onClick,
}: SpellProps) => {
  const { spellSlots, currentSlot } = useState();
  const slotPower = spellSlots[currentSlot].power;

  return (
    <div className={cx('spell', { active })} onClick={onClick}>
      <p>{name}</p>
      <p> {getSpellDescription(type, Math.ceil(power * slotPower))}</p>
    </div>
  );
};

const getSpellDescription = (spellType: SpellType, power: number) => {
  switch (spellType) {
    case 'fireball': {
      return `Deal ${power} damage to the enemy`;
    }
    case 'lightning_strike': {
      return `Deal ${Math.ceil(power * 0.85)} to the enemy and ${Math.ceil(
        power * 0.25,
      )} to another random one`;
    }
    case 'shadow_bolt': {
      return `Inflict one curse stack to the enemy and deal ${power} damage per each`;
    }
  }
};

export default Spell;
