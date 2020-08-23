import React from 'react';
import cx from 'classnames';

export type SpellType = 'fireball' | 'lightning_strike' | 'shadow_bolt';

export interface SpellProps {
  name: string;
  type: SpellType;
  active?: boolean;
}

const Spell: React.FC<SpellProps> = ({ name, active }: SpellProps) => {
  return <div className={cx('spell', { active })}>{name}</div>;
};

export default Spell;
