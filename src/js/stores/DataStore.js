var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var merge = require('react/lib/merge');


var _data = [];

// API Keys
var pubnub = PUBNUB.init({
  subscribe_key : 'demo',
  publish_key   : 'demo'
});

function _receiveData(data, raw, symbol) {
  data.ticker = symbol;
  data.key = data.time+data.ticker+data.price;
  data.category = data.perc < 0 ? 'loss' : 'gain';
  var updated = _data.concat(data);
  if (updated.length > 10) {
    updated = updated.slice(1, updated.length);
  }
  _data = updated;

  DataStore.emitChange();
}

var DataStore = merge(EventEmitter.prototype, {

  getAll: function() {
    return _data;
  },

  // Allow Controller-View to register itself with store
  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },
  // triggers change listener above, firing controller-view callback
  emitChange: function() {
    this.emit(Constants.CHANGE_EVENT);
  },


  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.STOP_TICKER:
        pubnub.unsubscribe({
          channel : payload.action.symbols
        });
        break;

      case Constants.ActionTypes.START_TICKER:
        pubnub.subscribe({
          channel : payload.action.symbols,
          message : _receiveData
        });
        break;
    }
  })

});

module.exports = DataStore;
