import React from 'react';
import './style.css';
import { useState } from './context';
import Enemy from './enemy';

const App: React.FC = () => {
  const state = useState();

  return (
    <div className="App">
      <div className="top">
        {state.enemies.map((e, index) => (
          <Enemy
            key={index}
            {...e}
            onClick={() => console.log(`${e.name} was clicked`)}
          />
        ))}
      </div>
      <div className="bot">Bottom content will be added soon</div>
    </div>
  );
};

export default App;
