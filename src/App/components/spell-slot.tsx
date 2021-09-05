import cx from 'classnames';
import React from 'react';

import { SpellSlotState } from '../../resources/spell-slots/spell-slot';

export interface SpellSlotProps extends SpellSlotState {
  active?: boolean;
}

const SpellSlot: React.FC<SpellSlotProps> = ({
  power,
  active,
}: SpellSlotProps) => {
  return <div className={cx('spell-slot', { active })}>Power: {power}</div>;
};

export default SpellSlot;
