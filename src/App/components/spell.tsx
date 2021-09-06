import cx from 'classnames';
import React from 'react';

import { SpellState } from '../../resources/spells/spell';

export interface SpellProps extends SpellState {
  active: boolean;
  description: string;
  onClick: () => void;
}

const Spell = ({
  name,
  active,
  description,
  onClick,
}: SpellProps): JSX.Element => {
  return (
    <div className={cx('spell', { active })} onClick={onClick}>
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
};

export default Spell;
