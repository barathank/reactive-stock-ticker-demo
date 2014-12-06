/*** @jsx React.DOM ***/
"use strict";
var React = require('react');
var DataStore = require('../stores/DataStore');
var ActionCreator = require('../actions/DataActionCreators');

var Ticker = React.createClass({

  getInitialState: function(){
    return {
      trx: [],
      symbols: ['GOOG', 'AAPL', 'FB'],
      running: false
    };
  },

  componentDidMount: function() {
    this._toggle();
    DataStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DataStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({trx: DataStore.getAll()});
  },

  _toggle: function() {
    if (this.state.running) {
      this._stopTicker();
    } else {
      this._startTicker();
    }
  },

  _startTicker: function() {
    ActionCreator.startTicker(this.state.symbols);
    this.setState({running: true});
    setTimeout(this._stopTicker, 10000);
  },

  _stopTicker: function() {
    ActionCreator.stopTicker(this.state.symbols);
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
