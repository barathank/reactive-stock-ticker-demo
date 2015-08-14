import React from 'react';
import OpeningPricesFilter from '../data/filters/OpeningPrices';
import {connect} from 'react-redux';

export default connect(OpeningPricesFilter)(
  class InitialPrices {
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
)
