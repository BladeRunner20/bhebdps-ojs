import Bow from './bow.js';

class LongBow extends Bow {
  constructor() {
    super();
    this.name = 'длинный лук';
    this.attack = 15;
    this.range = 4;
  }
}

export default LongBow;