import React from 'react';
import cx from 'classnames';
import { SpellState } from '../resources/spells/spell';

export interface SpellProps extends SpellState {
  active: boolean;
  description: string;
  onClick: () => void;
}

const Spell: React.FC<SpellProps> = ({
  name,
  active,
  description,
  onClick,
}: SpellProps) => {
  return (
    <div className={cx('spell', { active })} onClick={onClick}>
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
};

export default Spell;
