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
  
  checkWeapon() {
    if (!this.weapon.isBroken())
      return;
     if (this.weapon instanceof LongBow) { 
       console.log(`${this.name} теряет арбалет и берёт нож`);
       this.weapon = new Knife();
     } else { 
       super.checkWeapon(); 
     } 
   }
}

export default Crossbowman;
