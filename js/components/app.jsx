import React from 'react';
import TickerApp from './TickerApp';
import {createRedux} from 'redux';
import {Provider} from 'redux/react';
import * as stores from '../stores/index';

const redux = createRedux(stores);

export default React.createClass({
  render() {
    return (
      <Provider redux={redux}>
        {() => <TickerApp /> }
      </Provider>
    );
  }
});
