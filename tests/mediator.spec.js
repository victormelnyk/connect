import Mediator from '../src/mediator';

describe('Mediator:', () => {
  let mediator;

  beforeEach(() => {
    mediator = new Mediator();
  });

  it('provideChannel channel', () => {
    const func = () => {};

    mediator.provideChannel('CHANNEL', func);

    expect(mediator._channels['CHANNEL']).toEqual(func);
  });

  it('provideChannel duplicated channel', () => {
    const func = () => {};

    mediator.provideChannel('CHANNEL', func);
    expect(() => {
      mediator.provideChannel('CHANNEL', func);
    }).toThrowError('Mediator.provideChannel - channel "CHANNEL" already exist');
  });

  it('removeChannel channel', () => {
    const func = () => {};

    mediator.provideChannel('CHANNEL', func);
    mediator.removeChannel('CHANNEL');

    expect(mediator._channels['CHANNEL']).not.toBeDefined();
  });

  it('removeChannel not existing channel', () => {
    expect(() => {
      mediator.removeChannel('CHANNEL');
    }).toThrowError('Mediator.removeChannel - channel "CHANNEL" does not exist');
  });

  it('callChannelSynk channel without params', () => {
    const func = () => 2;
    const spyFunc = jasmine.createSpy().and.callFake(func);

    mediator.provideChannel('CHANNEL', spyFunc);
    const result = mediator.callChannelSynk('CHANNEL');

    expect(spyFunc).toHaveBeenCalled();
    expect(result).toEqual(2);
  });

  it('callChannelSynk channel with params', () => {
    const func = (val1, val2) => (val1 + val2) * 2;
    const spyFunc = jasmine.createSpy().and.callFake(func);

    mediator.provideChannel('CHANNEL', spyFunc);
    const result = mediator.callChannelSynk('CHANNEL', [1, 2]);

    expect(spyFunc).toHaveBeenCalledWith(1, 2);
    expect(result).toEqual(6);
  });

  it('callChannelSynk channel without results', () => {
    const func = () => {};
    const spyFunc = jasmine.createSpy().and.callFake(func);

    mediator.provideChannel('CHANNEL', spyFunc);
    const result = mediator.callChannelSynk('CHANNEL');

    expect(spyFunc).toHaveBeenCalled();
    expect(result).not.toBeDefined();
  });

  it('callChannelSynk not existing channel', () => {
    expect(() => {
      mediator.callChannelSynk('CHANNEL');
    }).toThrowError('Mediator.callChannelSynk - channel "CHANNEL" does not exist');
  });

  it('callChannelSynk returns Promise', () => {
    const func = () => Promise.resolve();

    mediator.provideChannel('CHANNEL', func);

    expect(() => {
      mediator.callChannelSynk('CHANNEL');
    }).toThrowError('Mediator.callChannelSynk - channel "CHANNEL" should not returns Promise');
  });

  it('callChannel channel without params', done => {
    const func = () => Promise.resolve(2);
    const spyFunc = jasmine.createSpy().and.callFake(func);

    mediator.provideChannel('CHANNEL', spyFunc);
    const resultPromise = mediator.callChannel('CHANNEL');

    expect(spyFunc).toHaveBeenCalled();
    resultPromise.then(result => {
      expect(result).toEqual(2);
      done();
    });
  });

  it('callChannel channel with params', done => {
    const func = (val1, val2) => Promise.resolve((val1 + val2) * 2);
    const spyFunc = jasmine.createSpy().and.callFake(func);

    mediator.provideChannel('CHANNEL', spyFunc);
    const resultPromise = mediator.callChannel('CHANNEL', [1, 2]);

    expect(spyFunc).toHaveBeenCalledWith(1, 2);
    resultPromise.then(result => {
      expect(result).toEqual(6);
      done();
    });
  });

  it('callChannel channel without results', done => {
    const func = () => Promise.resolve();
    const spyFunc = jasmine.createSpy().and.callFake(func);

    mediator.provideChannel('CHANNEL', spyFunc);
    const resultPromise = mediator.callChannel('CHANNEL');

    expect(spyFunc).toHaveBeenCalled();
    resultPromise.then(result => {
      expect(result).not.toBeDefined();
      done();
    });
  });

  it('callChannel not existing channel', done => {
    const resultPromise = mediator.callChannel('CHANNEL');

    resultPromise.catch(error => {
      expect(error).toEqual(new Error('Mediator.callChannel - channel "CHANNEL" does not exist'));
      done();
    });
  });

  it('callChannel returns not Promise', done => {
    const func = () => {};

    mediator.provideChannel('CHANNEL', func);
    const resultPromise = mediator.callChannel('CHANNEL');

    resultPromise.catch(error => {
      expect(error).toEqual(new Error('Mediator.callChannel - channel "CHANNEL" should returns Promise'));
      done();
    });
  });
});
