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
          <p className="lead">This is a page lead, it introduces the proceeding content.</p>
        </Header>
        <Main>
          <div className="col-xs-7">
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


