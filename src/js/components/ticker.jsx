/*** @jsx React.DOM ***/
"use strict";
var React = require('react');

// API Keys
var pubnub = PUBNUB.init({
  subscribe_key : 'demo',
  publish_key   : 'demo'
});


var Ticker = React.createClass({

  getInitialState: function(){
    return {
      trx: [],
      symbols: ['GOOG', 'AAPL', 'FB'],
      running: false
    };
  },

  _handleNew: function(data, raw, symbol) {
    data.ticker = symbol;
    data.key = data.time+data.ticker+data.price;
    data.category = data.perc < 0 ? 'loss' : 'gain';
    var updated = this.state.trx.concat(data);
    if (updated.length > 10) {
      updated = updated.slice(1, updated.length);
    }
    this.setState({trx: updated});
  },

  componentDidMount: function() {
    this._toggle();
  },

  _toggle: function() {
    if (this.state.running) {
      this._stopTicker();
    } else {
      this._startTicker();
    }
  },

  _startTicker: function() {
    pubnub.subscribe({
      channel : this.state.symbols,
      message : this._handleNew
    });
    this.setState({running: true});
    setTimeout(this._stopTicker, 10000);
  },

  _stopTicker: function() {
    pubnub.unsubscribe({
      channel : this.state.symbols
    });
    this.setState({running: false});
  },

  _clear: function() {
    this.setState({trx: []});
  },

  render: function() {
    return (
      <div>
        <table className="table table-bordered table-condensed">
          <thead>
            <tr>
              <td colSpan="2">
                <button className="btn btn-primary" onClick={this._toggle}>
                  {this.state.running ? 'Stop' : 'Start/Resume'}
                </button>
              </td>
              <td colSpan="2">
                <button onClick={this._clear} className="btn btn-success">
                  <i className="glyphicon glyphicon-refresh" /> Reset
                </button>
              </td>
            </tr>
            <tr>
              <th>Time</th>
              <th>Ticker</th>
              <th>Price</th>
              <th>% Change</th>
            </tr>
          </thead>
          <tbody>
            {this.state.trx.map(function(trx) {
              return (
                <tr key={trx.key} className={trx.category}>
                  <td>{trx.time}</td>
                  <td>{trx.ticker}</td>
                  <td>{trx.price}</td>
                  <td>{trx.perc}</td>
                </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = Ticker;
