import React from 'react';
import './style.css';

export interface EnemyProps {
  name: string;
  onClick?: () => void;
}

const Enemy: React.FC<EnemyProps> = ({ name, onClick }: EnemyProps) => {
  return (
    <div className="enemy" onClick={onClick}>
      {name}
    </div>
  );
};

export default Enemy;
