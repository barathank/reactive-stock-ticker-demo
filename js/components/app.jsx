import React from 'react';
import TickerApp from './TickerApp';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import * as reducers from '../reducers/index';

const store = createStore(combineReducers(reducers));

export default React.createClass({
  render() {
    return (
      <Provider store={store}>
        {() => <TickerApp /> }
      </Provider>
    );
  }
});
