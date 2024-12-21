import Weapon from './weapon.js';

class Bow extends Weapon {
  constructor() {
    super('Лук', 10, 200, 3);
  }
}

export default Bow;