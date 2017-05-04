(function() {
  var mediator = window.connect.mediator;

  mediator.provide('CHANNEL_1', function(value) {
    return value * 2;
  });
  var result = mediator.call('CHANNEL_1', [2]);
  console.log('CHANNEL_1 result', result);
  mediator.remove('CHANNEL_1');


  mediator.provide('CHANNEL_2', function(value) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(value * 2);
      }, 1000);
    });
  });
  mediator.call('CHANNEL_2', [2]).then(function(result) {
    console.log('CHANNEL_2 result', result);
  });
  mediator.remove('CHANNEL_2');
})();
