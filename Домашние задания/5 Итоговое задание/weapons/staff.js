import Weapon from './weapon.js';

class Staff extends Weapon {
  constructor() {
    super('Посох', 8, 300, 2);
  }
}

export default Staff;