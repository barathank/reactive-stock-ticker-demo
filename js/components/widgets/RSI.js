import React from 'react';
import {connect} from 'react-redux';
import {Spinner} from 'elemental';

import RSIFilter from '../../data/filters/RSI';

import BaseWidget from './BaseWidget';
import Header from './WidgetHeader';

class RSI {
  static propTypes = {
    rsi: React.PropTypes.array.isRequired
  }

  static defaultProps = {
    rsi: NaN
  }

  renderEmpty() {
    return (
      <BaseWidget type="info">
        <Header loading>RSI</Header>
      </BaseWidget>
    );
  }

  render() {
    const {rsi} = this.props;

    if (!rsi.length) {
      return this.renderEmpty();
    }

    return (
      <BaseWidget type={rsi.length ? 'success' : 'danger'}>
        <Header>RSI</Header>
        <ul>
          {rsi.map(({ticker, rsi}) =>
            <li>{ticker}: {rsi}</li>
          )}
        </ul>
      </BaseWidget>
    );
  }
}

export default connect(RSIFilter)(RSI);
