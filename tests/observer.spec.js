import Observer from '../src/observer';

fdescribe('Observer -', () => {
  let observer;

  beforeEach(() => {
    observer = new Observer();
  });

  describe('subscribe -', () => {
    it('subscribe to one channel', () => {
      const func = () => {};

      observer.subscribe('Subscriber', 'CHANEL', func);

      expect(observer._subscriptions['CHANEL']).toEqual(jasmine.any(Object));
      expect(observer._subscriptions['CHANEL']['Subscriber']).toEqual(func);
    });

    it('subscribe to same channel', () => {
      const func1 = () => {};
      const func2 = () => {};

      observer.subscribe('Subscriber', 'CHANEL', func1);
      observer.subscribe('Subscriber', 'CHANEL', func2);

      expect(observer._subscriptions['CHANEL']['Subscriber']).toEqual(func2);
    });

    it('subscribe to two channels', () => {
      const func = () => {};

      observer.subscribe('Subscriber', ['CHANEL_1', 'CHANEL_2'], func);

      expect(observer._subscriptions['CHANEL_1']['Subscriber']).toEqual(func);
      expect(observer._subscriptions['CHANEL_2']['Subscriber']).toEqual(func);
    });
  });

  describe('unsubscribe -', () => {
    it('unsubscribe from channel', () => {
      const func = () => {};

      observer.subscribe('Subscriber', 'CHANEL', func);

      expect(observer._subscriptions['CHANEL']['Subscriber']).toEqual(func);

      observer.unsubscribe('Subscriber');

      expect(observer._subscriptions['CHANEL']['Subscriber']).not.toBeDefined();
    });

    it('unsubscribe without subscribe', () => {
      const func = () => {};

      spyOn(observer, 'unsubscribe').and.callThrough();

      observer.subscribe('Subscriber1', 'CHANEL', func);

      expect(observer._subscriptions['CHANEL']['Subscriber1']).toEqual(func);
      expect(observer._subscriptions['CHANEL']['Subscriber2']).not.toBeDefined();

      observer.unsubscribe('Subscriber2');

      expect(observer.unsubscribe).toHaveBeenCalledWith('Subscriber2');
    });
  });

  describe('emit -', () => {
    it('emit without params', () => {
      const func = () => {};
      const spyFunc = jasmine.createSpy().and.callFake(func);

      observer.subscribe('Subscriber', 'CHANEL', spyFunc);
      observer.emit('CHANEL');

      expect(spyFunc).toHaveBeenCalledWith([]);
    });

    it('emit with params', () => {
      const func = () => {};
      const spyFunc = jasmine.createSpy().and.callFake(func);

      observer.subscribe('Subscriber', 'CHANEL', spyFunc);
      observer.emit('CHANEL', [1, 2]);

      expect(spyFunc).toHaveBeenCalledWith([1, 2]);
    });

    it('emit not registered channel', () => {
      spyOn(observer, 'emit').and.callThrough();

      observer.emit('CHANEL');

      expect(observer.emit).toHaveBeenCalledWith('CHANEL');
    });
  });
});
