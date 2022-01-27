import cx from 'classnames';
import React from 'react';

export interface SpellCardProps {
  active: boolean;
  description: string;
  onClick: () => void;
}

const SpellCard = ({
  active,
  description,
  onClick,
}: SpellCardProps): JSX.Element => {
  return (
    <div className={cx('spell', { active })} onClick={onClick}>
      <p>{description}</p>
    </div>
  );
};

export default SpellCard;
