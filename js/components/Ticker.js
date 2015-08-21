import React, {Component, PropTypes} from 'react';
import ToggleButton from './ToggleButton';
import ResetButton from './ResetButton';
import {Table} from 'elemental';

export default class Ticker extends Component {
  static propTypes = {
    transactions: PropTypes.array
  }

  static defaultProps = {
    transactions: []
  }

  render() {
    const {transactions} = this.props;

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
}
