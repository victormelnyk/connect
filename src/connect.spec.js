import ConnectWrapper from '../src/connectWrapper';

describe('#connectFactory', () => {
  let Connect;

  beforeEach(() => {
    // angular.mock.module('invictusApp');
    // inject(_Connect_ => {
    //   Connect = _Connect_;
    // });

    Connect = ConnectWrapper();
  });

  describe('#sync', () => {
    const fileName = 'anyFactory',
      cb = function() {
        return true;
      };

    it('should subscribe to event listener if there is no key in callbaks', () => {
      const method = 'ANY_NAME';

      spyOn(Connect, 'sync').and.callThrough();

      Connect.sync(fileName, method, cb);

      expect(Connect.__testonly__.callbacks[method][fileName]).toEqual(jasmine.any(Function));
    });

    it('should subscribe to event listener if there is no key in callbaks', () => {
      const methods = ['ANY_NAME', 'ANY_NAME2'];

      spyOn(Connect, 'sync').and.callThrough();

      Connect.__testonly__.callbacks.anyFactory2 = {};

      Connect.sync(fileName, methods, cb);

      expect(Connect.__testonly__.callbacks[methods[0]][fileName]).toEqual(jasmine.any(Function));
      expect(Connect.__testonly__.callbacks[methods[1]][fileName]).toEqual(jasmine.any(Function));
    });
  });

  describe('#callCallbacks', () => {
    it('should call callback function with provided arguments', () => {
      const method = 'ANY_NAME',
        args = 'cashout',
        moduleName = 'anyFactory';

      const cb = jasmine.createSpy('cbFn', () => true);

      Connect.sync(moduleName, method, cb);

      Connect.callCallbacks(method, args);

      expect(cb).toHaveBeenCalledWith(args);
    });
  });

  describe('#unsync', () => {
    it('unsubscribe from listening if callback method is defined', () => {
      const method = 'ANY_NAME',
        moduleName = 'anyFactory',
        cb = function() {
          return true;
        };

      Connect.sync(moduleName, method, cb);

      expect(Connect.__testonly__.callbacks[method][moduleName]).toBeDefined();

      Connect.unsync(moduleName);

      expect(Connect.__testonly__.callbacks[method][moduleName]).not.toBeDefined();

      Connect.unsync(moduleName);

      expect(Connect.__testonly__.callbacks[method][moduleName]).not.toBeDefined();
    });

    it('unsubscribe from listening if callback method is undefined', () => {
      const method = 'ANY_NAME',
        unknownMethod = 'DEL_METHOD',
        moduleName = 'anyFactory',
        cb = function() {
          return true;
        };
      Connect.sync(moduleName, method, cb);

      Connect.unsync(unknownMethod);

      expect(Connect.__testonly__.callbacks[unknownMethod]).not.toBeDefined();
    });
  });
});

