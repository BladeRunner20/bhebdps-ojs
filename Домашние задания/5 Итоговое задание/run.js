class Weapon {
  constructor() {
    this.name = 'Оружие';
    this.attack = 1;
    this.durability = 1;
    this.range = 1;
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

class Arm extends Weapon {
  constructor() {
    super(); //attack = 1, range = 1
    this.name = 'Рука';
    this.durability = Infinity;
	  this.startDurab = this.durability;
  }
}


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


class Sword extends Weapon {
  constructor() {
    super();
    this.name = 'Меч';
    this.attack = 25;
    this.durability = 500;
	  this.startDurab = this.durability;
  }
}


class Knife extends Weapon {
  constructor() {
    super(); // range = 1
    this.name = 'Нож';
    this.attack = 5;
    this.durability = 300;
	  this.startDurab = this.durability;
  }
}


class Staff extends Weapon {
  constructor() {
    super();
    this.name = 'Посох';
    this.attack = 8;
    this.durability = 300;
    this.range = 2;
	  this.startDurab = this.durability;
  }
}


class LongBow extends Bow {
  constructor() {
    super();
    this.name = 'Длинный лук';
    this.attack = 15;
    this.range = 4;
  }
}


class Axe extends Sword {
  constructor() {
    super();
    this.name = 'Секира';
    this.attack = 27;
    this.durability = 800;
    this.startDurab = this.durability;
  }
}


class StormStaff extends Staff {
  constructor() {
    super();
    this.name = 'Посох Бури';
    this.attack = 10;
    this.range = 3; 
  }
}


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
    if (!this.weapon.isBroken()) {
      return; 
    } else if (this.weapon instanceof Knife) {
      console.log(`${this.name} сломал нож. Будет сражаться руками`);
      this.weapon = new Arm();
      return;
    }
    else {
      console.log(`${this.name} сломал основное оружие - ${this.weapon.name}. Теперь он достает нож`);
      this.weapon = new Knife();
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
}


class Archer extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 80;
    this.magic = 35;
    this.attack = 5;
    this.agility = 10;
    this.weapon = new Bow(); // основное оружие - лук
    this.description = "Лучник";
    this.startLife = this.life;
    this.startMagic = this.magic;
  }
  
  getDamage(distance) {
    const weaponDamage = this.weapon.getDamage();
    const weaponRange = this.weapon.range;
    if (distance > weaponRange) {
      return 0;
    }
    return (this.attack + weaponDamage) * this.getLuck() * distance / weaponRange;
  }
}


class Mage extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 70;
    this.magic = 100;
    this.attack = 5;
    this.agility = 8;
    this.weapon = new Staff(); // основное оружие - посох
    this.description = "Маг";
    this.startLife = this.life;
    this.startMagic = this.magic;
  }
  
  takeDamage(damage) {
    let magicPercent = this.magic / this.startMagic * 100;
    if (magicPercent > 50) { 
      damage /= 2; 
      this.magic -= 12;
      if (this.magic < 0) {
        this.magic = 0; // устанавливаем ману в ноль
      }
    }
    super.takeDamage(damage);
  }
}

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


class Demiurge extends Mage {
  constructor(position, name) {
    super(position, name);
    this.description = "Демиург";
    this.weapon = new StormStaff(); 
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
}

function play(players) {
   while (players.filter(player => !player.isDead()).length > 1) {
     for (let player of players) {
       if (!player.isDead()) {
         player.turn(players);
       }
     }
   }

   const winner = players.find(player => !player.isDead());
   console.log(`Победитель: ${winner.name}, оставшаяся жизнь: ${winner.life}`);
}



function play(players) {
	
  let alivePlayersCount = 0;

  for (let i = 0; i < players.length; i++) {
    if (!players[i].isDead()) {
      alivePlayersCount++;
    }
  }

  while (alivePlayersCount > 1) {
    for (let j = 0; j < players.length; j++) {
      if (!players[j].isDead()) {
        players[j].turn(players);
      }
    }

    alivePlayersCount = 0;
    for (let k = 0; k < players.length; k++) {
      if (!players[k].isDead()) {
        alivePlayersCount++;
      }
    }
  }

  let winner = null;
  for (let l = 0; l < players.length; l++) {
    if (!players[l].isDead()) {
      winner = players[l];
      break;
    }
  }

  if (winner) {
    console.log(`Победитель: ${winner.name}, оставшаяся жизнь: ${winner.life}`);
  }
}

let char1 = new Warrior(1, "Воин Алексей");
let char2 = new Archer(10, "Лучница Илайза");
let char3 = new Mage(5, "Маг Дженоа");
let char4 = new Demiurge(8, "Демиург Ласиийет");
let char5 = new Dwarf(15, "Гномм Римми");
let char6 = new Crossbowman(18, "Арбалетчик Гаслинг");

let chars = [char1, char2, char3, char4, char5, char6];
play(chars); 