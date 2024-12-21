import Arm from '../weapons/arm.js';
import Knife from '../weapons/knife.js';

class Player {
  constructor(position, name) {
    this.life = 100;
    this.magic = 20;
    this.speed = 1;
    this.attack = 10;
    this.agility = 5;
    this.luck = 10;
    this.description = 'Игрок';
    this.weapon = new Arm();
    this.position = position;
    this.name = name;
    this.startLife = this.life;
    this.startMagic = this.magic;
  }

  getLuck() {
    let randomNumber = Math.floor(Math.random() * 101);
    return (randomNumber + this.luck) / 100;
  }

  getDamage(distance) {
    if (distance > this.weapon.range) {
      return 0;
    }
    return (this.attack + this.weapon.getDamage()) * this.getLuck() / distance;
  }

  takeDamage(damage) {
    this.life -= damage;
    console.log(`Здоровье игрока ${this.name} уменьшается на ${damage} урона`);
    if (this.life < 0) {
      this.life = 0;
    }
  }

  isDead() {
    return this.life === 0; 
  }

  moveLeft(distance) {
    const moveDistance = Math.min(distance, this.speed);
    this.position -= moveDistance;
  }

  moveRight(distance) {
    const moveDistance = Math.min(distance, this.speed);
    this.position += moveDistance;
  }

  isAttackBlocked() {
    return this.getLuck() > (100 - this.luck) / 100;
  }

  dodged() {
    return this.getLuck() > (100 - this.agility - this.speed * 3) / 100;
  }

  takeAttack(damage) {
    if (this.isAttackBlocked()) {
      this.weapon.takeDamage(damage);
      console.log(`${this.name} блокирует удар, ущерб оружию: ${damage}`);
      return;
    }
    
    if (this.dodged()) {
      console.log(`${this.name} уклонился от удара`);
      return;
    }
    
    this.takeDamage(damage);
    
  }
  
  checkWeapon() {
    if (!this.weapon.isBroken())
      return;
    if (this.weapon instanceof Arm) {
      return; 
    } else if (this.weapon instanceof Knife) {
      console.log(`${this.name} сломал нож. Будет сражаться руками`);
      this.weapon = new Arm();
      return;
    }
  }
  
  tryAttack(enemy) {
    let doubleDmg = false;
    console.log(`${this.name} собирается атаковать ${enemy.name}`);
    
    if (this.position === enemy.position) {
      console.log(`${enemy.name} отлетает на позицию ${enemy.position} и получит удвоенный урон от ${this.name}`);
	  enemy.moveRight(1);
	  doubleDmg = true;
    }
    let distance = Math.abs(this.position - enemy.position);
    if (distance > this.weapon.range) {
      console.log(`${this.name} не дотянется до ${enemy.name}`);
      return;
    }
    let damage = this.getDamage(distance);
    if (doubleDmg)
	  damage *= 2;
    
    console.log(`${this.name} атакует ${enemy.name} c силой ${damage}`);
    
    this.weapon.takeDamage(10 * this.getLuck()); 
    enemy.takeAttack(damage);
    this.checkWeapon();
    enemy.checkWeapon();
  }

  chooseEnemy(players) {
    const aliveEnemies = [];
    
    for (const player of players) {
      if (player !== this && !player.isDead()) {
        aliveEnemies.push(player);
      }
    }

    if (aliveEnemies.length === 0) {
      return null; 
    }

    let weakestEnemy = aliveEnemies[0];
    
    for (let j = 1; j < aliveEnemies.length; j++) {
      if (aliveEnemies[j].life < weakestEnemy.life) {
        weakestEnemy = aliveEnemies[j];
      }
    }

    return weakestEnemy;
  }


  moveToEnemy(enemy) {
	  
    if (!enemy || enemy.isDead()) {
      return;
    }
    
    if (this.position - enemy.position < -1) {
      let distanceToMove = Math.min(enemy.position - this.position - 1, this.speed);
      console.log(`${this.name} движется вправо к ${enemy.name}`);
      this.moveRight(distanceToMove);
    } else if (this.position - enemy.position > 1) {
      let distanceToMove = Math.min(this.position - enemy.position - 1, this.speed);
      console.log(`${this.name} движется влево к ${enemy.name}`);
      this.moveLeft(distanceToMove);
    } else {
      console.log(`${this.name} уже рядом с ${enemy.name}`);
    }
  }

  turn(players) {
    console.log(`\nХод игрока ${this.name} (${this.life} / ${this.startLife})`);
    const enemy = this.chooseEnemy(players);
    
    if (enemy) {
      console.log(`Выбран противник ${enemy.name} (уровень здоровья ${enemy.life})`);
      this.moveToEnemy(enemy);
      this.tryAttack(enemy);
      
      if (enemy.isDead()) {
        console.log(`${enemy.name} погиб после атаки ${this.name}`);
      }
    } else {
      console.log(`${this.name} не нашёл врагов для атаки`);
    }
  }  
}  

export default Player;
