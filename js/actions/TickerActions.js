import * as ActionTypes from '../constants/ActionTypes';
import {SYMBOLS} from '../constants/Config';
import stockService from '../data/stock-service';

const ticker = stockService();

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

// TODO: best practive for triggering this?
export function receiveData(data, raw, symbol) {
  return (dispatch, getState) => {
    data.ticker = symbol;
    data.key = data.time+data.ticker+data.price;
    if (Math.random() > getState().Ticker.chaosFactor) {
      data.category = 'loss';
    } else {
      data.category = data.perc < 0 ? 'loss' : 'gain';
    }
    dispatch({
      type: ActionTypes.DATA_RECEIVED,
      data
    });
  };
}

export function startTicker(callback) {
  ticker.start(callback);
  return { type: ActionTypes.TICKER_STARTED };
}

export function stopTicker() {
  ticker.stop();
  return { type: ActionTypes.TICKER_STOPPED };
}

export function reset() {
  return { type: ActionTypes.DATA_RESET };
}
