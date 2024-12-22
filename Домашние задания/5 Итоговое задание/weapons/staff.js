import Weapon from './weapon.js';

class Staff extends Weapon {
  constructor() {
    super();
    this.name = 'Посох';
    this.attack = 8;
    this.durability = 300;
    this.range = 2;
	this.startDurab = this.durability;
  }
}

export default Staff;