
export const store = (collection, data) => {
  return {
    type: '@horizon.store',
    payload: {
      collection, data
    }
  };
}

export const watch = (collection, opts={}) => {
  return {
    type: '@horizon.watch',
    payload: {
      collection, ...opts
    }
  };
}

export const unwatch = collection => {
  return {
    type: '@horizon.unwatch',
    payload: collection
  };
};
