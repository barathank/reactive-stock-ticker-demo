import React from 'react';

export default React.createClass({
  propTypes: {
    prices: React.PropTypes.object
  },

  render() {
    const {prices} = this.props;
    return (
      <ul>
        {Object.keys(prices).map(key =>
          <li>{`${key}: ${prices[key]}`}</li>
        )}
      </ul>
    );
  }
});
