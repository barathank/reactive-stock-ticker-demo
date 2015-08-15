import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/TickerActions';
import VisiblePrices from '../data/filters/VisiblePrices';

import ToggleButton from './ToggleButton';
import ResetButton from './ResetButton';

import {Table} from 'elemental';

class Ticker extends Component {
  constructor(props) {
    super(props);
    this.actions = bindActionCreators(Actions, props.dispatch);
    this._toggle = this._toggle.bind(this);
  }

  static propTypes = {
    transactions: PropTypes.array.isRequired,
    recording: PropTypes.bool.isRequired
  }

  static defaultProps = {
    transactions: [],
    recording: false
  }

  render() {
    const {transactions, recording} = this.props;

    return (
      <Table>
        <colgroup>
          <col width="25%" />
          <col width="25%" />
          <col width="25%" />
          <col width="25%" />
        </colgroup>
        <thead>
          <tr>
            <td colSpan="2">
              <ToggleButton recording={recording} onClick={this._toggle} />
            </td>
            <td colSpan="2">
              <ResetButton onClick={this.actions.reset} />
            </td>
          </tr>
          <tr>
            <th>Time</th>
            <th>Ticker</th>
            <th>Price</th>
            <th>% Change</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(trx =>
            <tr key={trx.key} className={trx.category}>
              <td>{trx.time}</td>
              <td>{trx.ticker}</td>
              <td>{trx.price}</td>
              <td>{trx.perc}</td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }

  _toggle(e) {
    this.props.recording
      ? this.actions.stopTicker(e)
      : this.actions.startTicker(this.actions.receiveData);
  }
}

Ticker = connect(state => state.Ticker)(Ticker);
export default connect(VisiblePrices)(Ticker);
