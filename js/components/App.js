import React from 'react';
import TickerApp from './TickerApp';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import reducers from '../reducers';
import {initialize} from '../actions/TickerActions';
import 'babel-polyfill';
import {rootSaga} from '../sagas';

// middleware
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, compose(
  applyMiddleware(thunk, sagaMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

sagaMiddleware.run(rootSaga);

store.dispatch(initialize());

export default React.createClass({
  render() {
    return (
      <Provider store={store}>
        <TickerApp />
      </Provider>
    );
  }
});
