import React from 'react';
import TickerApp from './TickerApp';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import * as reducers from '../reducers/index';
import {initialize} from '../actions/TickerActions';

// Devtools
import thunk from 'redux-thunk';
import horizon from '../middleware/horizon';

const finalCreateStore = compose(
  applyMiddleware(
    thunk,
    horizon({host: 'localhost:8181', authType: 'unauthenticated'})
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = finalCreateStore(combineReducers(reducers));

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
