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
   * Checks is value Promise
   * @param {*} value
   * @returns {boolean}
   */
  static isPromise(value = {}) {
    return Boolean(value.then);
  }

  /**
   * Call provided asynchronous channel function
   * @param {string} channel
   * @param {[*]} [channelFunctionArguments]
   * @returns {Promise.<*>}
   */
  // TODO resolve Promise
  callChannel(channel, channelFunctionArguments = []) {
    const channelFunction = this._channels[channel];

    if (!channelFunction) {
      return Promise.reject(new Error(`Mediator.callChannel - channel "${channel}" does not exist`));
    }

    const result = channelFunction(...channelFunctionArguments);

    if (!Mediator.isPromise(result)) {
      return Promise.reject(new Error(`Mediator.callChannel - channel "${channel}" should returns Promise`));
    }

    return result;
  }

  /**
   * Call provided synchronous channel function
   * @param {string} channel
   * @param {[*]} [channelFunctionArguments]
   * @returns {*}
   */
  callChannelSynk(channel, channelFunctionArguments = []) {
    const channelFunction = this._channels[channel];

    if (!channelFunction) {
      throw new Error(`Mediator.callChannelSynk - channel "${channel}" does not exist`);
    }

    const result = channelFunction(...channelFunctionArguments);

    if (Mediator.isPromise(result)) {
      throw new Error(`Mediator.callChannelSynk - channel "${channel}" should not returns Promise`);
    }

    return result;
  }

  /**
   * Set channel function
   * @param {string} channel
   * @param {function} channelFunction
   */
  provideChannel(channel, channelFunction) {
    if (this._channels[channel]) {
      throw new Error(`Mediator.provideChannel - channel "${channel}" already exist`);
    }

    this._channels[channel] = channelFunction;
  }

  /**
   * Remove channel
   * @param {string} channel
   */
  removeChannel(channel) {
    if (!this._channels[channel]) {
      throw new Error(`Mediator.removeChannel - channel "${channel}" does not exist`);
    }

    delete this._channels[channel];
  }
}
