import React from 'react';
import cx from 'classnames';

export interface SpellSlotProps {
  power: number;
  active?: boolean;
}

const SpellSlot: React.FC<SpellSlotProps> = ({
  power,
  active,
}: SpellSlotProps) => {
  return <div className={cx('spell-slot', { active })}>Power: {power}</div>;
};

export default SpellSlot;
