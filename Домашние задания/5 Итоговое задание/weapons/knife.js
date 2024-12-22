import Weapon from './weapon.js';

class Knife extends Weapon {
  constructor() {
    super(); // range = 1
    this.name = 'Нож';
    this.attack = 5;
    this.durability = 300;
	this.startDurab = this.durability;
  }
}

export default Knife;