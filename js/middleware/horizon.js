
const PREFIX = '@horizon';

const isHorizonAction = action =>
  action && action.type.indexOf(PREFIX) === 0;

const getType = (suffix) =>
  [PREFIX, suffix].join('.');

export default (config={}, Horizon=window.Horizon) => {
  const instance = Horizon(config);
  instance.connect();

  return store => {
    instance.onReady(() => {
      store.dispatch({
        type: getType('ready'),
        payload: instance
      });
    });

    const subscriptions = {};

    return next => action => {
      if (!isHorizonAction(action)) {
        return next(action);
      }

      if (action.type === getType('watch')) {
        const {collection, raw=false} = action.payload;
        subscriptions[collection] = instance(collection).watch({ rawChanges: !!raw }).subscribe(({new_val, type}) => {
          if (type === 'add') {
            next({
              type: getType(collection + '.added'),
              payload: new_val
            });
          }
        });
      }

      if (action.type === getType('unwatch')) {
        const collection = action.payload;
        const sub = subscriptions[collection];
        delete subscriptions[collection];
        sub.unsubscribe();
      }

      if (action.type === getType('store')) {
        const {collection, data} = action.payload;
        instance(collection).store(data).forEach(
          id => next({
            type: getType('store.success'),
            payload: {collection, id}
          })
        );
      }
    }
  };
};
