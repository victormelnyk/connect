export default class Observer {
  constructor() {
    // TODO add strict mode
    /**
     * Subscriptions map
     * @member {{channel: {subscriberName: function}}}
     * @private
     */
    this._subscriptions = {};
  }

  subscribe(subscriberName, channel, channelFunction) {
    const channels = _.isArray(channel) ? channel : [channel];

    _.each(channels, channelName => {
      if (!this._subscriptions[channelName]) {
        this._subscriptions[channelName] = {};
      }

      this._subscriptions[channelName][subscriberName] = channelFunction;
    });
  }

  unsubscribe(subscriberName) {
    _.each(this._subscriptions, channelFunctionsBySubscriberName => {
      if (channelFunctionsBySubscriberName[subscriberName]) {
        delete channelFunctionsBySubscriberName[subscriberName];
      } // TODO add error on strict mode if subscription not exist
    });
  }

  emit(channel, channelFunctionArguments = []) {
    const channelFunctionsBySubscriberName = this._subscriptions[channel];

    if (channelFunctionsBySubscriberName) {
      _.each(channelFunctionsBySubscriberName, channelFunction => {
        // TODO update to channelFunction(...channelFunctionArguments);
        channelFunction(channelFunctionArguments);
      });
    }
  }
}
