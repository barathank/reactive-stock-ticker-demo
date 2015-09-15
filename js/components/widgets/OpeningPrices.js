import React from 'react';
import {connect} from 'react-redux';
import {Spinner} from 'elemental';

import OpeningPricesFilter from '../../data/queries/OpeningPrices';
import BaseWidget from './BaseWidget';

class OpeningPrices {
  static propTypes = {
    prices: React.PropTypes.array.isRequired
  }

  static defaultProps = {
    prices: []
  }

  renderBlank() {
    return (
      <BaseWidget>
        <h2>Opening Prices <small style={{float: "right"}}><Spinner block /></small></h2>
      </BaseWidget>
    )
  }

  render() {
    const {prices} = this.props;
    if (!prices.length) {
      return this.renderBlank();
    }
    return (
      <BaseWidget>
        <h2>Opening Prices</h2>
        <ul>
          {prices.map(({key, openPrice}) =>
            <li key={key}>{key}: {openPrice}</li>
          )}
        </ul>
      </BaseWidget>
    );
  }
}

export default connect(OpeningPricesFilter)(OpeningPrices);
