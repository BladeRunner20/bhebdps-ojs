import Warrior from './warrior.js';
import Axe from '../weapons/axe.js';
import Knife from '../weapons/knife.js';

class Dwarf extends Warrior {
	
  constructor(position, name) {
    super(position, name);
    this.description = "Гном";
    this.life = 130;
    this.attack = 15;
    this.luck = 20;
    this.weapon = new Axe();
    this.startLife = this.life;
    this.startMagic = this.magic;
    this.hitsTaken = 0;
  }
  
  takeDamage(damage) {
    this.hitsTaken += 1;
    if ((this.hitsTaken % 6 === 0) && this.getLuck() > 0.5) {
      damage /= 2;
    }
    super.takeDamage(damage);
  }
}

export default Dwarf;
