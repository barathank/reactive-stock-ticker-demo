import React from 'react';
import RSIFilter from '../data/filters/RSI';
import {connect} from 'react-redux';

class RSI {
  static propTypes = {
    rsi: React.PropTypes.array.isRequired
  }

  static defaultProps = {
    rsi: NaN
  }

  render() {
    const {rsi} = this.props;
    return (
      <h2>GOOG: {rsi}</h2>
    );
  }
}

export default connect(RSIFilter('GOOG', 5))(RSI);
