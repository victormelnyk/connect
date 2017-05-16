import Mediator from './mediator';
import Observer from './observer';

window.connection = {
  Mediator,
  Observer,
  mediator: new Mediator(),
  observer: new Observer()
};
