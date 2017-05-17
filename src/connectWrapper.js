import Observer from './observer';

export default function ConnectWrapper() {

  const observer = new Observer();

  return {
    __testonly__: {
      get callbacks() {
        return observer._subscriptions;
      }
    },
    sync(fileName, method, cb) {
      observer.subscribe(fileName, method, cb);
    },
    unsync(fileName) {
      observer.unsubscribe(fileName);
    },
    callCallbacks(method, args) {
      observer.emit(method, args);
    }
  };
}
