import Mage from './mage.js';
import StormStaff from '../weapons/stormstaff.js';
import Knife from '../weapons/knife.js';

class Demiurge extends Mage {
  constructor(position, name) {
    super(position, name);
    this.description = "Демиург";
    this.weapon = new StormStaff(); // основное оружие - посох бури
    this.life = 80;
    this.magic = 120;
    this.attack = 6;
    this.luck = 12;
    this.startLife = this.life;
    this.startMagic = this.magic;
  }
  
  getDamage(distance) {
    if (this.magic > 0 && this.getLuck() > 0.6) {
      return super.getDamage(distance) * 1.5;
    } else {
      return super.getDamage(distance);
    }
  }
  
  checkWeapon() {
    if (!this.weapon.isBroken())
      return;
     if (this.weapon instanceof StormStaff) { 
       console.log(`${this.name} ломает свой Посох Бури и берёт нож`);
       this.weapon = new Knife();
     } else { 
       super.checkWeapon(); 
     } 
   }
}

export default Demiurge;
