import React, {Component} from 'react';
import {connect} from 'react-redux';
import {default as InitialPricesFilter} from '../data/filters/InitialPrices';

@connect(InitialPricesFilter)
class InitialPrices extends Component {
  static propTypes = {
    prices: React.PropTypes.object
  }

  render() {
    // TODO: calculate RSI to get a divide by zero error:
    // http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:relative_strength_index_rsi
    const {prices} = this.props;
    return (
      <ul>
        {prices.map(({key, ticker, price}) =>
          <li key={key}>{`${ticker}: ${price}`}</li>
        )}
      </ul>
    );
  }
}

export default InitialPrices;
