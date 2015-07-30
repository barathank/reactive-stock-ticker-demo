import React from 'react';

export default React.createClass({
  propTypes: {
    prices: React.PropTypes.object
  },

  render() {
    // TODO: calculate RSI to get a divide by zero error:
    // http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:relative_strength_index_rsi
    const {prices} = this.props;
    return (
      <ul>
        {Object.keys(prices).map(key =>
          <li key={key}>{`${key}: ${prices[key]}`}</li>
        )}
      </ul>
    );
  }
});
