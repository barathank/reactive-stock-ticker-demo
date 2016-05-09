import React from 'react';
import TickerApp from './TickerApp';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import * as reducers from '../reducers/index';
import {initialize} from '../actions/TickerActions';
import 'babel-polyfill';
import {Horizon} from '../sagas';

// middleware
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
const sagaMiddleware = createSagaMiddleware();

const finalCreateStore = compose(
  applyMiddleware(
    thunk, sagaMiddleware
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = finalCreateStore(combineReducers(reducers));

export default React.createClass({
  render() {
    return (
      <Provider store={store}>
        <TickerApp />
      </Provider>
    );
  }
});

sagaMiddleware.run(Horizon.bind(null, store));

store.dispatch(initialize());
