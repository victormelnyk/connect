// TODO move to separate files
// Sink call without params
(() => {
  const mediator = window.connection.mediator;

  const result = mediator.executeSynk('CHANNEL_1');
  console.log('Mediator executeSynk', 'CHANNEL_1', result);
})();

// Sink call with params
(() => {
  const mediator = window.connection.mediator;

  const result = mediator.executeSynk('CHANNEL_2', [1, 2]);
  console.log('Mediator executeSynk', 'CHANNEL_2', result);
})();

// Asink call with params
(() => {
  const mediator = window.connection.mediator;

  mediator.execute('CHANNEL_3', [1, 2]).then(result => {
    console.log('Mediator execute', 'CHANNEL_3', result);
  });
})();
