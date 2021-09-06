import cx from 'classnames';
import React from 'react';

import { SpellSlotState } from '../../resources/spell-slots/spell-slot';

export interface SpellSlotProps extends SpellSlotState {
  active?: boolean;
}

const SpellSlot = ({ power, active }: SpellSlotProps): JSX.Element => {
  return <div className={cx('spell-slot', { active })}>Power: {power}</div>;
};

export default SpellSlot;
