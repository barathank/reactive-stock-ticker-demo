import React from 'react';
import Ticker from './Ticker';
import InitialPrices from './InitialPrices';
import styles from '../../css/styles.css';
import * as Actions from '../actions/TickerActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {default as VisiblePrices} from '../data/filters/VisiblePrices';

class TickerApp extends React.Component {
  render() {
    const { transactions, stocks, recording, dispatch } = this.props;
    const actions = bindActionCreators(Actions, dispatch);
    return (
      <div>
        <Ticker transactions={transactions} recording={recording}
          onStart={actions.startTicker.bind(null, actions.receiveData)}
          onStop={actions.stopTicker} onReset={actions.reset}
        />
        <InitialPrices stocks={stocks} />
      </div>
    );
  }
}

TickerApp = connect(VisiblePrices)(TickerApp);
TickerApp = connect(state => ({stocks: state.Stocks}))(TickerApp);

export default TickerApp;
