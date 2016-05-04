import * as ActionTypes from '../constants/ActionTypes';
import {watch, unwatch} from './HorizonActions';

export function initialize() {
  return (dispatch, getState) => {
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
  return (dispatch) => {
    dispatch({ type: ActionTypes.TICKER_STARTED });
    dispatch(watch('transactions', {raw: true}));
  };
}

export function stopTicker() {
  return dispatch => {
    dispatch(unwatch('transactions'));
    dispatch({ type: ActionTypes.TICKER_STOPPED });
  };
}

export function reset() {
  return { type: ActionTypes.DATA_RESET };
}
