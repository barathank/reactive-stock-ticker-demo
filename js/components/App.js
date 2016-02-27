import React from 'react';
import TickerApp from './TickerApp';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import * as reducers from '../reducers/index';

// Devtools
import thunk from 'redux-thunk';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  createStore
);

const store = finalCreateStore(combineReducers(reducers));

export default React.createClass({
  render() {
    return (
      <Provider store={store}>
        {() => <TickerApp /> }
      </Provider>
    );
  }
});
