export default class Mediator {
  constructor() {
    /**
     * Channel map
     * @member {{}}
     * @private
     */
    this._channels = {};
  }

  static isPromise(value = {}) {
    return Boolean(value.then);
  }

  /**
   * Request to call provided function
   * @param {string} channel
   * @param {[*]} [args]
   * @returns {*}
   */
  // TODO resolve Promise
  request(channel, args = []) {
    const func = this._channels[channel];

    if (!func) {
      return Promise.reject(new Error(`Mediator.request - channel "${channel}" does not exist`));
    }

    const result = func(...args);

    if (!Mediator.isPromise(result)) {
      return Promise.reject(new Error(`Mediator.request - channel "${channel}" should returns Promise`));
    }

    return result;
  }

  /**
   * Request to call provided synchronous function
   * @param {string} channel
   * @param {[*]} [args]
   * @returns {*}
   */
  requestSynk(channel, args = []) {
    const func = this._channels[channel];
    if (!func) {
      throw new Error(`Mediator.requestSynk - channel "${channel}" does not exist`);
    }

    const result = func(...args);

    if (Mediator.isPromise(result)) {
      throw new Error(`Mediator.requestSynk - channel "${channel}" should not returns Promise`);
    }

    return result;
  }

  /**
   * Set channel function
   * @param {string} channel
   * @param {function} func
   */
  provide(channel, func) {
    if (this._channels[channel]) {
      throw new Error(`Mediator.provide - channel "${channel}" already exist`);
    }

    this._channels[channel] = func;
  }

  /**
   * Remove channel
   * @param {string} channel
   */
  remove(channel) {
    if (!this._channels[channel]) {
      throw new Error(`Mediator.remove - channel "${channel}" does not exist`);
    }

    delete this._channels[channel];
  }
}
