import React from 'react';
import { useState, useDispatch } from './context';
import Enemy from './enemy';

const Enemies: React.FC = () => {
  const { enemies } = useState();
  const dispatch = useDispatch();

  return (
    <>
      <h3>Enemies</h3>
      <p>
        Click an enemy to cast currently selected spell with the current slot
      </p>
      <div className="enemies">
        {enemies.map((e, index) => (
          <Enemy
            key={index}
            {...e}
            onClick={() => dispatch({ type: 'castSpell', target: index })}
          />
        ))}
      </div>
    </>
  );
};

export default Enemies;
