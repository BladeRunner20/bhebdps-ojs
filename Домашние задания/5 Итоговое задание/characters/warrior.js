import Player from './player.js';
import Sword from '../weapons/sword.js';
import Knife from '../weapons/knife.js';

class Warrior extends Player {
  
  constructor(position, name) {
    super(position, name);
    this.life = 120;
    this.attack = 10;
    this.speed = 2;
    this.weapon = new Sword();
    this.description = "Воин";
    this.starttLife = this.life;
  }
  
  takeDamage(damage) {
    let lifePercent = (this.life / this.startLife) * 100;
    let luck = this.getLuck();
    if (lifePercent < 50 && luck > 0.8) {
      if (this.magic > damage) {
        this.magic -= damage;
      } else {
        const remainingDamage = damage - this.magic;
        this.magic = 0;
        this.life -= remainingDamage;
      }
    } else {
      super.takeDamage(damage);
    }
    if (this.life < 0) {
      this.life = 0;
    }
  }
  
  checkWeapon() {
    if (!this.weapon.isBroken())
      return;
     if (this.weapon instanceof Sword) {
       console.log(`${this.name} ломает свой меч и будет сражаться ножом`);
       this.weapon = new Knife();
     } else {
       super.checkWeapon();
     }
   }
}

export default Warrior;
