import React from 'react';
import Ticker from './ticker.jsx';

// Realtime API Keys
const SYMBOLS = ['GOOG', 'AAPL', 'FB', 'HUBS'];
var pubnub = PUBNUB.init({
  subscribe_key: 'demo',
  publish_key: 'demo'
});

export default React.createClass({
  mixins: [ParseReact.Mixin],

  observe() {
    return {
      quotes: (new Parse.Query('Quote')).limit(10).descending('createdAt')
    };
  },

  render() {
    let {recording} = this.props;
    return (
      <Ticker transactions={this.data.quotes} onStart={this.onStart}
        onStop={this.onStop} onReset={this.onReset} recording={recording} />
    );
  },

  onStart(e) {
    pubnub.subscribe({
      channel: SYMBOLS,
      message: this.onReceiveData
    });
    this.props.onStart(e);
    setTimeout(this.onStop, 10000);
  },

  onStop(e) {
    pubnub.unsubscribe({
      channel: SYMBOLS
    });
    this.props.onStop(e);
  },

  onReset(e) {
    this.props.onReset(e);
  },

  onReceiveData(data, raw, symbol) {
    data.ticker = symbol;
    data.key = data.time+data.ticker+data.price;
    data.category = data.perc < 0 ? 'loss' : 'gain';
    var creator = ParseReact.Mutation.Create('Quote', data);
    creator.dispatch();
  }
});
