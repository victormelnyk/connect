export default class Mediator {
  constructor() {
    console.log('New Mediator');

    /**
     * Channel map
     * @member {{}}
     */
    this.channels = {};
  }

  /**
   *
   * @param channel
   * @param args
   * @returns {*}
   */
  call(channel, args) {
    console.log(`Mediator call "${channel}"`);
    if (!this.channels[channel]) {
      throw Error(`Mediator.call. Channel "${channel}" does not exist`);
    }
    return this.channels[channel].apply(null, args);
  }

  /**
   *
   * @param channel
   * @param func
   */
  provide(channel, func) {
    console.log(`Mediator provide "${channel}"`);
    if (this.channels[channel]) {
      throw Error(`Mediator.provide. Channel "${channel}" already exist`);
    }

    this.channels[channel] = func;
  }

  /**
   *
   * @param channel
   */
  remove(channel) {
    console.log(`Mediator remove "${channel}"`);
    if (!this.channels[channel]) {
      throw Error(`Mediator.remove. Channel "${channel}" does not exist`);
    }

    delete this.channels[channel];
  }
}
