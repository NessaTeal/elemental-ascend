import React from 'react';
import './style.css';
import SpellBook from './spell-book';
import SpellChain from './spell-chain';
import Enemies from './enemies';

const App: React.FC = () => {
  return (
    <div className="App">
      <Enemies />
      <SpellChain />
      <SpellBook />
    </div>
  );
};

export default App;
