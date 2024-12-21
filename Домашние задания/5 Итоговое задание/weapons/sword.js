import Weapon from './weapon.js';

class Sword extends Weapon {
  constructor() {
    super('Меч', 25, 500, 1);
  }
}

export default Sword;