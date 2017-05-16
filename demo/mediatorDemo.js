// Sink call without params
(() => {
  const mediator = window.connection.mediator;

  mediator.register('CHANNEL_1', () => 2);

  const result = mediator.executeSynk('CHANNEL_1');
  console.log('CHANNEL_1 result', result);

  mediator.unregister('CHANNEL_1');
})();

// Sink call with params
(() => {
  const mediator = window.connection.mediator;

  mediator.register('CHANNEL_2', (val1, val2) => (val1 + val2) * 2);

  const result = mediator.executeSynk('CHANNEL_2', [1, 2]);
  console.log('CHANNEL_2 result', result);

  mediator.unregister('CHANNEL_2');
})();

// Asink call with params
(() => {
  const mediator = window.connection.mediator;

  mediator.register('CHANNEL_3', (val1, val2) => new Promise(resolve => {
    setTimeout(() => {
      resolve((val1 + val2) * 2);
    }, 1000);
  }));

  mediator.execute('CHANNEL_3', [1, 2]).then(result => {
    console.log('CHANNEL_3 result', result);
  });

  mediator.unregister('CHANNEL_3');
})();
