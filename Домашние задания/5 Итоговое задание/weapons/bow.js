import Weapon from './weapon.js';

class Bow extends Weapon {
  constructor() {
    super();
    this.name = 'Лук';
    this.attack = 10;
    this.durability = 200;
    this.range = 3;
	this.startDurab = this.durability;
  }
}

export default Bow;