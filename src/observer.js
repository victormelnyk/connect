export default class Observer {
  constructor() {
    /**
     * Subscriptions map
     * @member {{channel: {subkey: function}}}
     * @private
     */
    this._subscriptions = {};
  }
  // TODO rename subkey
  subscribe(subkey, channel, channelFunction) {
    const channels = _.isArray(channel) ? channel : [channel];

    _.each(channels, channelName => {
      if (!this._subscriptions[channelName]) {
        this._subscriptions[channelName] = {};
      }

      this._subscriptions[channelName][subkey] = channelFunction;
    });
  }

  unsubscribe(subkey) {
    _.each(this._subscriptions, channelFunctionsBySubkey => {
      if (channelFunctionsBySubkey[subkey]) {
        delete channelFunctionsBySubkey[subkey];
      }
    });
  }

  emit(channel, channelFunctionArguments = []) {
    _.each(this._subscriptions[channel], channelFunction => {
      // TODO update to channelFunction(...channelFunctionArguments);
      channelFunction(channelFunctionArguments);
    });
  }
}
