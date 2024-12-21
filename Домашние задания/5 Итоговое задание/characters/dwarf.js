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
  }
  
  takeDamage(damage) {
    if (this.getLuck() > 0.5 && Math.floor(Math.random() * 6) == 0) {
      damage /= 2;
    }
    super.takeDamage(damage);
  }
  
  checkWeapon() { 
    if (!this.weapon.isBroken())
      return;
     if (this.weapon instanceof Axe) { 
       console.log(`${this.name} теряет секиру и берёт нож`);
       this.weapon = new Knife();
     } else { 
       super.checkWeapon(); 
     } 
   }
}


export default Dwarf;
