import Weapon from './weapon.js';

class Arm extends Weapon {
  constructor() {
    super('Рука', 1, Infinity, 1);
  }
}

export default Arm;