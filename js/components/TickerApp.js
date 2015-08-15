import React from 'react';
import styles from '../../css/styles.css';

import Ticker from './Ticker';
import OpeningPrices from './OpeningPrices';
import RSI from './RSI';
import Page from './layouts/Page';
import Main from './layouts/Main';
import Sidebar from './layouts/Sidebar';

export default class TickerApp {
  render() {
    return (
      <Page>
        <Main className="col-xs-8">
          <Ticker />
        </Main>
        <Sidebar>
          <OpeningPrices />
          <RSI />
        </Sidebar>
      </Page>
    );
  }
}


