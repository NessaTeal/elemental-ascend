import React from 'react';
import { EnemyState } from '../resources/enemies/enemy';

export interface EnemyProps extends EnemyState {
  onClick?: () => void;
}

const Enemy: React.FC<EnemyProps> = ({
  name,
  health,
  maxHealth,
  afflictions,
  onClick,
}: EnemyProps) => {
  return (
    <div className="enemy" onClick={onClick}>
      <div className="top">{name}</div>
      <div className="mid">
        {health}/{maxHealth}
      </div>
      <div className="bot">
        {afflictions?.map((a, index) => (
          <div key={index}>
            {a.type} x{a.stacks}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Enemy;
