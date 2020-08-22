import React, { ReactElement } from 'react';
import './style.css';

class Enemy {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  onClick(): void {
    console.log(`My name is ${this.name} and I'm your enemy`);
  }

  render(): ReactElement {
    return (
      <div className="enemy" onClick={() => this.onClick()}>
        {this.name}
      </div>
    );
  }
}

export default Enemy;
