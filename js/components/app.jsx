import React from 'react';
import Ticker from './ticker.jsx';
import styles from '../../css/styles.css';

// API Keys
var pubnub = PUBNUB.init({
  subscribe_key : 'demo',
  publish_key   : 'demo'
});

export default React.createClass({
  getInitialState() {
    return {
      data: [],
      recording: false
    };
  },

  getDefaultProps: function () {
    return {
      symbols: ['GOOG', 'AAPL', 'FB']
    }
  },

  componentWillUnmount() {
    this.stopTicker();
  },

  render() {
    let {recording, data} = this.state;
    return (
      <Ticker transactions={data} recording={recording} onStart={this.startTicker}
        onStop={this.stopTicker} onReset={this.reset} />
    );
  },

  startTicker() {
    pubnub.subscribe({
      channel : this.props.symbols,
      message : this.onReceiveData
    });
    setTimeout(this.stopTicker, 10000);
    this.setState({recording: true});
  },

  stopTicker() {
    pubnub.unsubscribe({
      channel : this.props.symbols
    });
    this.setState({recording: false});
  },

  reset() {
    this.setState({data: []})
  },

  onReceiveData(data, raw, symbol) {
    data.ticker = symbol;
    data.key = data.time+data.ticker+data.price;
    data.category = data.perc < 0 ? 'loss' : 'gain';
    var updated = this.state.data.concat(data);
    if (updated.length > 10) {
      updated = updated.slice(1, updated.length);
    }
    this.setState({data: updated});
  }
});
