import Weapon from './weapon.js';

class Sword extends Weapon {
  constructor() {
    super();
    this.name = 'Меч';
    this.attack = 25;
    this.durability = 500;
	this.startDurab = this.durability;
  }
}

export default Sword;