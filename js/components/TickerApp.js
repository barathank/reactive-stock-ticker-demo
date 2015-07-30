import React from 'react';
import Ticker from './Ticker';
import InitialPrices from './InitialPrices';
import styles from '../../css/styles.css';
import * as Actions from '../actions/TickerActions';

import { bindActionCreators } from 'redux';
import { Connector } from 'react-redux';


export default React.createClass({
  render() {
    return (
      <Connector select={state => ({ ...state.Ticker, initial: {...state.InitialPrices} })}>
        {this.renderChild}
      </Connector>
    );
  },

  renderChild({ transactions, recording, initial, dispatch }) {
    const actions = bindActionCreators(Actions, dispatch);
    return (
      <div>
        <Ticker transactions={transactions} recording={recording}
          onStart={actions.startTicker.bind(null, actions.receiveData)}
          onStop={actions.stopTicker} onReset={actions.reset}
        />
        <InitialPrices prices={initial} />
      </div>
    );
  }
});
