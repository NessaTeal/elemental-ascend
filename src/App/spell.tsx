import React from 'react';
import cx from 'classnames';

export interface SpellProps {
  name: string;
  active?: boolean;
}

const Spell: React.FC<SpellProps> = ({ name, active }: SpellProps) => {
  return <div className={cx('spell', { active })}>{name}</div>;
};

export default Spell;
