import * as ActionTypes from '../constants/ActionTypes';
import {SYMBOLS} from '../constants/Config';

// TODO: move this to an initializable data service
const pubnub = PUBNUB.init({
  subscribe_key: 'demo',
  publish_key: 'demo'
});

export function initialize() {
  console.log('App Initialized');
}

export function setMinTransactions(num) {
  return {
    type: SET_MIN_TRANS,
    value: num
  }
}

export function cancelModal() {
  return {type: ActionTypes.MODAL_CANCELED};
}

export function openModal() {
  return {type: ActionTypes.MODAL_OPENED};
}

export function saveModal(chaos, minTrans) {
  return (dispatch) => {
    dispatch({type: ActionTypes.SET_MIN_TRANS, value: minTrans});
    dispatch({type: ActionTypes.SET_CHAOS, value: chaos});
    dispatch({type: ActionTypes.MODAL_CANCELED});
  }
}


// TODO: move all logic to read chaos factor from store
let chaos = 0.5;

// TODO: best practive for triggering this?
export function receiveData(data, raw, symbol) {
  // TODO: move this to a model object
  data.ticker = symbol;
  data.key = data.time+data.ticker+data.price;
  if (Math.random() > chaos) {
    data.category = 'loss';
  } else {
    data.category = data.perc < 0 ? 'loss' : 'gain';
  }
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
