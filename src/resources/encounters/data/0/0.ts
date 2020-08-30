import { Encounter } from '../../encounter';

class Encounter0 extends Encounter {
  constructor() {
    super({
      enemies: ['Wolfie', 'Jom'],
    });
  }
}

export default (): Encounter0 => new Encounter0();
