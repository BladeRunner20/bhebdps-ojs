import Weapon from './weapon.js';

class Arm extends Weapon {
  constructor() {
    super(); //attack = 1, range = 1
    this.name = 'Рука';
    this.durability = Infinity;
	this.startDurab = this.durability;
  }
}

export default Arm;