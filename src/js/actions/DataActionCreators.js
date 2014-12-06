var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');
var DataStore = require('../stores/DataStore');

module.exports = {

  receiveData: function(text) {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.RECEIVE_DATA,
      text: text
    });
  },

  startTicker: function(symbols) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.START_TICKER,
      symbols: symbols
    })
  },

  stopTicker: function(symbols) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.STOP_TICKER,
      symbols: symbols
    })
  }

};
