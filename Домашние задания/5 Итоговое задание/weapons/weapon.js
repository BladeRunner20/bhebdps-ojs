class Weapon {
  constructor(name, attack, durability, range) {
    this.name = name;
    this.attack = attack;
    this.durability = durability;
    this.range = range;
	this.startDurab = this.durability;
  }
  
  takeDamage(damage) {
    this.durability -= damage;
    if (this.durability < 0) {
      this.durability = 0;
    }
  }
  
  getDamage() {
    if (this.durability <= 0) {
      return 0;
    }
    
    const durPercent = this.durability / this.startDurab * 100;
    if (durPercent >= 30) {
      return this.attack;
    } else {
      return Math.floor(this.attack / 2);
    }
  }
  
  isBroken() {
    return this.durability === 0;
  }
  
}

export default Weapon;
