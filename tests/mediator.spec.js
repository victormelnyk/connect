import Mediator from '../src/mediator';

describe('Mediator', () => {

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

  it('request channel', () => {
    const func = value => value * 2;
    const spyFunc = jasmine.createSpy().and.callFake(func);

    mediator.provide('CHANNEL', spyFunc);
    const result = mediator.request('CHANNEL', [2]);

    expect(spyFunc).toHaveBeenCalledWith(2);
    expect(result).toEqual(4);
  });

  it('request not existing channel', () => {
    expect(() => {
      mediator.request('CHANNEL');
    }).toThrowError('Mediator.request - channel "CHANNEL" does not exist');
  });
});
