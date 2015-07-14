import * as ActionTypes from '../constants/ActionTypes';

// API Keys
const pubnub = PUBNUB.init({
  subscribe_key: 'demo',
  publish_key: 'demo'
});
const SYMBOLS = ['GOOG', 'AAPL', 'FB'];


export function initialize() {
  console.log('App Initialized');
}

export function receiveData(data, raw, symbol) {
  data.ticker = symbol;
  data.key = data.time+data.ticker+data.price;
  data.category = data.perc < 0 ? 'loss' : 'gain';
  return {
    type: ActionTypes.DATA_RECEIVED,
    data
  };
}

export function startTicker(callback) {
  pubnub.subscribe({
    channel: SYMBOLS,
    message: callback
  });
  return { type: ActionTypes.TICKER_STARTED };
}

export function stopTicker() {
  pubnub.unsubscribe({
    channel: SYMBOLS
  });
  return { type: ActionTypes.TICKER_STOPPED };
}

export function reset() {
  return { type: ActionTypes.DATA_RESET };
}
