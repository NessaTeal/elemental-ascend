import React from 'react';
import './style.css';
import { useState } from './context';

const App: React.FC = () => {
  const state = useState();

  return (
    <div className="App">
      <div className="top">
        {state.enemies.map((e, index) => (
          <div key={index}> {e.render()}</div>
        ))}
      </div>
      <div className="bot">Bottom content will be added soon</div>
    </div>
  );
};

export default App;
