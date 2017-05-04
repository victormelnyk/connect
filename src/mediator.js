export default class Mediator {
  constructor() {
    console.log('New Mediator');

    this.runCount = 0;
  }

  run() {
    console.log('Mediator run');
    this.runCount++;
  }
}
