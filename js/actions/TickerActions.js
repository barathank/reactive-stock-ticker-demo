import * as ActionTypes from '../actions/ActionTypes';

export function initialize() {
  console.log('App Initialized');
  return { type: ActionTypes.APP_STARTED };
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

export function saveModal(minTrans) {
  return (dispatch) => {
    dispatch({type: ActionTypes.SET_MIN_TRANS, value: minTrans});
    dispatch({type: ActionTypes.MODAL_CANCELED});
  }
}

export function startTicker() {
  return { type: ActionTypes.TICKER_STARTED };
}

export function stopTicker() {
  return { type: ActionTypes.TICKER_STOPPED };
}

export function reset() {
  return { type: ActionTypes.DATA_RESET };
}
