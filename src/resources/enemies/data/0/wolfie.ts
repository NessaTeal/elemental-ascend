import { EnemyClass } from '../../enemy';

export class Wolfie extends EnemyClass {
  constructor() {
    super({
      name: 'Wolfie',
      health: 50,
    });
  }
}

export default (): Wolfie => new Wolfie();
