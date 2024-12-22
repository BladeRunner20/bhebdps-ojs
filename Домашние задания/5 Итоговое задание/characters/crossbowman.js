import Archer from './archer.js';
import LongBow from '../weapons/longbow.js';
import Knife from '../weapons/knife.js';

class Crossbowman extends Archer {
  constructor(position, name) {
    super(position, name);
    this.weapon = new LongBow(); // основное оружие - длинный лук
    this.description = "Арбалетчик";
    this.life = 85;
    this.attack = 8;
    this.agility = 20;
    this.luck = 15;
    this.baseLife = this.life;
    this.baseMagic = this.magic;
  }
}


export default Crossbowman;
