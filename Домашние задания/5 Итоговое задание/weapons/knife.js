import Weapon from './weapon.js';

class Knife extends Weapon {
  constructor() {
    super('Нож', 5, 300, 1);
  }
}

export default Knife;