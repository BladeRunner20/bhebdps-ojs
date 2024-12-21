import Weapon from './weapons/weapon.js';
import Player from './characters/player.js';
import Warrior from './characters/warrior.js';
import Archer from './characters/archer.js';
import Mage from './characters/mage.js';
import Dwarf from './characters/dwarf.js';
import Crossbowman from './characters/crossbowman.js';
import Demiurge from './characters/demiurge.js';

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