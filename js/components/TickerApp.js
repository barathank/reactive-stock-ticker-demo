import React from 'react';
import Ticker from './Ticker';
import OpeningPrices from './OpeningPrices';
import RSI from './RSI';
import styles from '../../css/styles.css';

export default class TickerApp {
  render() {
    return (
      <div>
        <Ticker />
        <OpeningPrices />
        <RSI />
      </div>
    );
  }
}


