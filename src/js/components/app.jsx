import React from 'react';
import Ticker from './ticker.jsx';
import MutationReporter from './mutations.jsx';

const SYMBOLS = ['GOOG', 'AAPL', 'FB'];

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
      autostart: false,
      symbols: SYMBOLS
    }
  },

  componentWillUnmount() {
    this.stopTicker();
  },

  render() {
    let {recording, data} = this.state;
    return (
      <MutationReporter recording={recording}>
        <Ticker transactions={data} recording={recording} onStart={this.startTicker}
          onStop={this.stopTicker} onReset={this.reset} />
      </MutationReporter>
    );
  },

  startTicker() {
    pubnub.subscribe({
      channel : this.props.symbols,
      message : this.onReceiveData
    });
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
