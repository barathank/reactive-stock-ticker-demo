import React, {Component} from 'react';

export default class InitialPrices {
  static propTypes = {
    stocks: React.PropTypes.object.isRequired
  }

  render() {
    const {stocks} = this.props;
    return (
      <ul>
        {Object.keys(stocks).map(key =>
          <li key={key}>{key}: {stocks[key].openPrice}</li>
        )}
      </ul>
    );
  }
}
