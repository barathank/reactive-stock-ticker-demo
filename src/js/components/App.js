/*** @jsx React.DOM */

var React = require('react');
var DataStore = require('../stores/DataStore');
var ActionCreator = require('../actions/DataActionCreators');
var Ticker = require('./ticker.jsx');

var App = React.createClass({

  _onChange: function() {
    this.setState(DataStore.getAll());
  },

  _onButtonClick: function(e) {
    var newTitle = prompt('Enter new title:');
    if (newTitle) {
      ActionCreator.updateTitle(newTitle);
    }
  },

  getInitialState: function() {
    var data = DataStore.getAll();
    return {
      title: data.title || "Reactive Stock Ticker Demo"
    }
  },

  componentDidMount: function() {
    DataStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DataStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <Ticker />
      </div>
    );
  }

});

module.exports = App;
