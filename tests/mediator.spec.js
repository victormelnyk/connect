import Mediator from '../src/mediator';

describe('Mediator:', () => {
  let mediator;

  beforeEach(() => {
    mediator = new Mediator();
  });

  it('provide channel', () => {
    const func = () => {};

    mediator.provide('CHANNEL', func);

    expect(mediator._channels['CHANNEL']).toEqual(func);
  });

  it('provide duplicated channel', () => {
    const func = () => {};

    mediator.provide('CHANNEL', func);
    expect(() => {
      mediator.provide('CHANNEL', func);
    }).toThrowError('Mediator.provide - channel "CHANNEL" already exist');
  });

  it('remove channel', () => {
    const func = () => {};

    mediator.provide('CHANNEL', func);
    mediator.remove('CHANNEL');

    expect(mediator._channels['CHANNEL']).not.toBeDefined();
  });

  it('remove not existing channel', () => {
    expect(() => {
      mediator.remove('CHANNEL');
    }).toThrowError('Mediator.remove - channel "CHANNEL" does not exist');
  });

  it('requestSynk channel without params', () => {
    const func = () => 2;
    const spyFunc = jasmine.createSpy().and.callFake(func);

    mediator.provide('CHANNEL', spyFunc);
    const result = mediator.requestSynk('CHANNEL');

    expect(spyFunc).toHaveBeenCalled();
    expect(result).toEqual(2);
  });

  it('requestSynk channel with params', () => {
    const func = (val1, val2) => (val1 + val2) * 2;
    const spyFunc = jasmine.createSpy().and.callFake(func);

    mediator.provide('CHANNEL', spyFunc);
    const result = mediator.requestSynk('CHANNEL', [1, 2]);

    expect(spyFunc).toHaveBeenCalledWith(1, 2);
    expect(result).toEqual(6);
  });

  it('requestSynk channel without results', () => {
    const func = () => {};
    const spyFunc = jasmine.createSpy().and.callFake(func);

    mediator.provide('CHANNEL', spyFunc);
    const result = mediator.requestSynk('CHANNEL');

    expect(spyFunc).toHaveBeenCalled();
    expect(result).not.toBeDefined();
  });

  it('requestSynk not existing channel', () => {
    expect(() => {
      mediator.requestSynk('CHANNEL');
    }).toThrowError('Mediator.requestSynk - channel "CHANNEL" does not exist');
  });

  it('requestSynk returns Promise', () => {
    const func = () => Promise.resolve();

    mediator.provide('CHANNEL', func);

    expect(() => {
      mediator.requestSynk('CHANNEL');
    }).toThrowError('Mediator.requestSynk - channel "CHANNEL" should not returns Promise');
  });
});
