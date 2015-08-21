import React from 'react';
import styles from '../../css/styles.css';

import Ticker from './Ticker';
import OpeningPrices from './widgets/OpeningPrices';
import RSI from './widgets/RSI';
import Page from './layouts/Page';
import Main from './layouts/Main';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import Footer from './layouts/Footer';

export default class TickerApp {
  render() {
    return (
      <Page>
        <Header>
          <h2>Live Stock Ticker</h2><hr />
          <p className="lead">
            Your one-stop-shop for figuring out nothing about any real,
            actual financial data.
          </p>
        </Header>
        <Main>
          <div className="col-xs-8">
            <Ticker />
          </div>
          <Sidebar>
            <OpeningPrices />
            <RSI />
          </Sidebar>
        </Main>
        <Footer />
      </Page>
    );
  }
}
