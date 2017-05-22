// Sink call without params
(() => {
  const mediator = window.connection.mediator;

  mediator.register('CHANNEL_1', () => 2);
  console.log('Mediator register', 'CHANNEL_1');
})();

// Sink call with params
(() => {
  const mediator = window.connection.mediator;

  mediator.register('CHANNEL_2', (val1, val2) => (val1 + val2) * 2);
  console.log('Mediator register', 'CHANNEL_2');
})();

// Asink call with params
(() => {
  const mediator = window.connection.mediator;

  mediator.register('CHANNEL_3', (val1, val2) => new Promise(resolve => {
    setTimeout(() => {
      resolve((val1 + val2) * 2);
    }, 1000);
  }));
  console.log('Mediator register', 'CHANNEL_3');
})();
