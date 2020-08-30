import { EnemyClass } from '../../enemy';

export class Jom extends EnemyClass {
  constructor() {
    super({
      name: 'Jom',
      health: 100,
    });
  }
}

export default (): Jom => new Jom();
