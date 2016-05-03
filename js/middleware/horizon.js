
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
        type: `${PREFIX}.ready`,
        payload: instance
      });
    });

    return next => action => {
      if (!isHorizonAction(action)) {
        return next(action);
      }

      if (action.type === getType('watch')) {
        const {collection, raw=false} = action.payload;
        instance(collection).watch({ rawChanges: !!raw }).forEach(({new_val, type}) => {
          if (type === 'add') {
            next({
              type: getType(collection + '.added'),
              payload: new_val
            });
          }
        });
      }

      if (action.type === getType('store')) {
        const {collection, data} = action.payload;
        instance(collection).store(data).forEach(
          id =>  store.dispatch({type: PREFIX + '.store.success', payload: {store, id}}),
          err => store.dispatch({type: PREFIX + '.store.failure', payload: {store, err}})
        );
      }
    }
  };
};
