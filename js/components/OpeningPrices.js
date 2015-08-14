import React from 'react';
import OpeningPricesFilter from '../data/filters/OpeningPrices';
import {connect} from 'react-redux';

class OpeningPrices {
  static propTypes = {
    prices: React.PropTypes.array.isRequired
  }

  static defaultProps = {
    prices: []
  }

  render() {
    const {prices} = this.props;
    return (
      <ul>
        {prices.map(({key, openPrice}) =>
          <li key={key}>{key}: {openPrice}</li>
        )}
      </ul>
    );
  }
}

export default connect(OpeningPricesFilter)(OpeningPrices);
