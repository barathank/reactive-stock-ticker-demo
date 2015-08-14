import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/TickerActions';
import VisiblePrices from '../data/filters/VisiblePrices';

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
      <table className="table table-bordered table-condensed">
        <thead>
          <tr>
            <td colSpan="2">
              <button className="btn btn-primary" onClick={this._toggle}>
                {recording ? 'Stop' : 'Start/Resume'}
              </button>
            </td>
            <td colSpan="2">
              <button onClick={this.actions.reset} className="btn btn-success">
                <i className="glyphicon glyphicon-refresh" /> Reset
              </button>
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
      </table>
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
