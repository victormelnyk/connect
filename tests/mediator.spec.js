import Mediator from '../src/mediator';

describe('Mediator -', () => {
  let mediator;

  beforeEach(() => {
    mediator = new Mediator();
  });

  describe('register -', () => {
    it('add channel', () => {
      const func = () => {};

      mediator.register('CHANNEL', func);

      expect(mediator._channels['CHANNEL']).toEqual(func);
    });

    it('duplicated channel', () => {
      const func = () => {};

      mediator.register('CHANNEL', func);

      expect(() => {
        mediator.register('CHANNEL', func);
      }).toThrowError('Mediator.register - channel "CHANNEL" already exist');
    });
  });

  describe('unregister -', () => {
    it('remove channel', () => {
      const func = () => {};

      mediator.register('CHANNEL', func);
      mediator.unregister('CHANNEL');

      expect(mediator._channels['CHANNEL']).not.toBeDefined();
    });

    it('not existing channel', () => {
      expect(() => {
        mediator.unregister('CHANNEL');
      }).toThrowError('Mediator.unregister - channel "CHANNEL" does not exist');
    });
  });

  describe('executeSynk -', () => {
    it('channel without params', () => {
      const func = () => 2;
      const spyFunc = jasmine.createSpy().and.callFake(func);

      mediator.register('CHANNEL', spyFunc);
      const result = mediator.executeSynk('CHANNEL');

      expect(spyFunc).toHaveBeenCalled();
      expect(result).toEqual(2);
    });

    it('channel with params', () => {
      const func = (val1, val2) => (val1 + val2) * 2;
      const spyFunc = jasmine.createSpy().and.callFake(func);

      mediator.register('CHANNEL', spyFunc);
      const result = mediator.executeSynk('CHANNEL', [1, 2]);

      expect(spyFunc).toHaveBeenCalledWith(1, 2);
      expect(result).toEqual(6);
    });

    it('channel without results', () => {
      const func = () => {};
      const spyFunc = jasmine.createSpy().and.callFake(func);

      mediator.register('CHANNEL', spyFunc);
      const result = mediator.executeSynk('CHANNEL');

      expect(spyFunc).toHaveBeenCalled();
      expect(result).not.toBeDefined();
    });

    it('not existing channel', () => {
      expect(() => {
        mediator.executeSynk('CHANNEL');
      }).toThrowError('Mediator.executeSynk - channel "CHANNEL" does not exist');
    });

    it('returns Promise', () => {
      const func = () => Promise.resolve();

      mediator.register('CHANNEL', func);

      expect(() => {
        mediator.executeSynk('CHANNEL');
      }).toThrowError('Mediator.executeSynk - channel "CHANNEL" should not returns Promise');
    });
  });

  describe('execute -', () => {
    it('channel without params', done => {
      const func = () => Promise.resolve(2);
      const spyFunc = jasmine.createSpy().and.callFake(func);

      mediator.register('CHANNEL', spyFunc);
      const resultPromise = mediator.execute('CHANNEL');

      expect(spyFunc).toHaveBeenCalled();
      resultPromise.then(result => {
        expect(result).toEqual(2);
        done();
      });
    });

    it('channel with params', done => {
      const func = (val1, val2) => Promise.resolve((val1 + val2) * 2);
      const spyFunc = jasmine.createSpy().and.callFake(func);

      mediator.register('CHANNEL', spyFunc);
      const resultPromise = mediator.execute('CHANNEL', [1, 2]);

      expect(spyFunc).toHaveBeenCalledWith(1, 2);
      resultPromise.then(result => {
        expect(result).toEqual(6);
        done();
      });
    });

    it('channel without results', done => {
      const func = () => Promise.resolve();
      const spyFunc = jasmine.createSpy().and.callFake(func);

      mediator.register('CHANNEL', spyFunc);
      const resultPromise = mediator.execute('CHANNEL');

      expect(spyFunc).toHaveBeenCalled();
      resultPromise.then(result => {
        expect(result).not.toBeDefined();
        done();
      });
    });

    it('not existing channel', done => {
      const resultPromise = mediator.execute('CHANNEL');

      resultPromise.catch(error => {
        expect(error).toEqual(new Error('Mediator.execute - channel "CHANNEL" does not exist'));
        done();
      });
    });

    it('returns not Promise', done => {
      const func = () => {};

      mediator.register('CHANNEL', func);
      const resultPromise = mediator.execute('CHANNEL');

      resultPromise.catch(error => {
        expect(error).toEqual(new Error('Mediator.execute - channel "CHANNEL" should returns Promise'));
        done();
      });
    });
  });
});
