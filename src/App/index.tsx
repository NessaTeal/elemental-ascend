import React from 'react';
import './style.css';
import { useState, useDispatch } from './context';
import Enemy from './enemy';
import SpellBook from './spell-book';

const App: React.FC = () => {
  const state = useState();
  const dispatch = useDispatch();

  return (
    <div className="App">
      <div className="top">
        {state.enemies.map((e, index) => (
          <Enemy
            key={index}
            {...e}
            onClick={() => dispatch({ type: 'castSpell', target: index })}
          />
        ))}
      </div>
      <div className="bot">
        <SpellBook />
      </div>
    </div>
  );
};

export default App;
