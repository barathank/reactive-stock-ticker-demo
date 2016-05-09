import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas/Horizon';

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducers, compose(
    applyMiddleware(thunk, sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
  sagaMiddleware.run(rootSaga);

  return store;
};
