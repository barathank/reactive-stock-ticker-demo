import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import 'babel-polyfill';
import TickerApp from './components/TickerApp';

import {initialize} from './actions/TickerActions';
import createStore from './createStore';

const store = createStore();

render(
  <Provider store={store}>
    <TickerApp />
  </Provider>,
  document.getElementById('main')
);

store.dispatch(initialize());
