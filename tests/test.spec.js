describe('Mediator', () => {

  const mediator = window.connect.mediator;

  it('call run', () => {
    mediator.run();
    expect(mediator.runCount).toEqual(1);
  });
});
