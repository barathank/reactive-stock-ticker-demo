import * as ActionTypes from '../constants/ActionTypes';
import {SYMBOLS} from '../constants/Config';
import stockService from '../data/stock-service';
import {watch} from './HorizonActions';

let ticker;

export function initialize() {
  return (dispatch, getState) => {
    dispatch(watch('transactions', {raw: true}))
    ticker = stockService(dispatch);
    console.log('App Initialized');
  }
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

export function startTicker() {
  ticker.start();
  return { type: ActionTypes.TICKER_STARTED };
}

export function stopTicker() {
  ticker.stop();
  return { type: ActionTypes.TICKER_STOPPED };
}

export function reset() {
  return { type: ActionTypes.DATA_RESET };
}
