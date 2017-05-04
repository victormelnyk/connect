export default class Mediator {
  constructor() {
    /**
     * Channel map
     * @member {{}}
     * @private
     */
    this._channels = {};
  }

  /**
   * Request to call provided function
   * @param {string} channel
   * @param {[*]} args
   * @returns {*}
   */
  request(channel, args = []) {
    if (!this._channels[channel]) {
      throw Error(`Mediator.request - channel "${channel}" does not exist`);
    }
    return this._channels[channel](...args);
  }

  /**
   * Set channel function
   * @param {string} channel
   * @param {function} func
   */
  provide(channel, func) {
    if (this._channels[channel]) {
      throw Error(`Mediator.provide - channel "${channel}" already exist`);
    }

    this._channels[channel] = func;
  }

  /**
   * Remove channel
   * @param {string} channel
   */
  remove(channel) {
    if (!this._channels[channel]) {
      throw Error(`Mediator.remove - channel "${channel}" does not exist`);
    }

    delete this._channels[channel];
  }
}
