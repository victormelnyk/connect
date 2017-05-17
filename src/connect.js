/**
 * @ngdoc service
 * @name invictusApp.Connect
 * @description
 * # Connect
 * Factory in the invictusApp.
 */
export default /* @ngInject */ function Connect() {
  // Store submodules functionality extensions.
  const callbacks = {};

  /**
   * Subscribe to listener
   * @param {string} fileName -- name of file where subscribing was applied
   * @param {string} method -- name of the listener trigger
   * @param {function} cb -- function which should be called
   */
  function sync(fileName, method, cb) {
    const methods = _.isArray(method) ? method : [method];

    _.each(methods, el => {
      if (!callbacks[el]) {
        callbacks[el] = {};
      }
      callbacks[el][fileName] = cb;
    });
  }

  /**
   * Unsubscribe from listening.
   * @param {string} fileName  -- name of file for unsubscribing
   */
  function unsync(fileName) {
    _.each(callbacks, method => {
      if (method[fileName]) {
        delete method[fileName];
      }
    });
  }

  /**
   * Call callback function with provided arguments
   *
   * @param {string} method  -- name of method
   * @param {object} args
   */
  function callCallbacks(method, args) {
    _.each(callbacks[method], cb => {
      cb(args);
    });
  }

  // Public API
  return {
    /* test-code */
    __testonly__: {
      callbacks
    },
    sync,
    unsync,
    callCallbacks
  };
}
