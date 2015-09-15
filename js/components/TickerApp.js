import React, {Component, PropTypes} from 'react';
import styles from '../../css/styles.css';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/TickerActions';
import VisiblePrices from '../data/queries/VisiblePrices';

import Ticker from './Ticker';
import OpeningPrices from './widgets/OpeningPrices';
import RSI from './widgets/RSI';
import Page from './layouts/Page';
import Main from './layouts/Main';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import Footer from './layouts/Footer';
import Controls from './Controls';
import SettingsModal from './modals/Settings';


class TickerApp extends Component {
  constructor(props) {
    super(props);
    this.actions = bindActionCreators(Actions, props.dispatch);
  }

  static propTypes = {
    transactions: PropTypes.array.isRequired,
    recording: PropTypes.bool.isRequired,
    settingsModal: PropTypes.bool,
    minTransactions: PropTypes.number.isRequired,
    chaosFactor: PropTypes.number.isRequired
  }

  static defaultProps = {
    transactions: [],
    recording: false,
    settingsModal: false
  }

  render() {
    const {recording, settingsModal, transactions, minTransactions, chaosFactor} = this.props;
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
            <Ticker transactions={transactions} />
          </div>
          <Sidebar>
            <OpeningPrices />
            <RSI />
            <Controls recording={recording} actions={this.actions} />
          </Sidebar>
        </Main>
        <Footer />
        <SettingsModal
          isOpen={settingsModal}
          onSave={this.actions.saveModal}
          onCancel={this.actions.cancelModal}
          minTransactions={minTransactions}
          chaosFactor={chaosFactor}
        />
      </Page>
    );
  }
}

TickerApp = connect(state => state.Ticker)(TickerApp);
export default connect(VisiblePrices)(TickerApp);
