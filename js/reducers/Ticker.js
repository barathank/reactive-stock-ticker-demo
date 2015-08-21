import {
  TICKER_STARTED,
  TICKER_STOPPED,
  MODAL_OPENED,
  MODAL_CANCELED,
  SET_MIN_TRANS,
  SET_CHAOS
} from '../constants/ActionTypes';

let defaultState = {
  recording: false,
  settingsModal: false,
  minTransactions: 14,
  chaosFactor: 0.5
};

export default function(state=defaultState, action) {
  switch (action.type) {
    case TICKER_STARTED:
      return {...state, recording: true};

    case TICKER_STOPPED:
      return {...state, recording: false};

    case MODAL_CANCELED:
      return {...state, settingsModal: false};

    case MODAL_OPENED:
      return {...state, settingsModal: true};

    case SET_CHAOS:
      return {...state, chaosFactor: parseFloat(action.value)};

    case SET_MIN_TRANS:
      return {...state, minTransactions: parseInt(action.value)};

    default:
      return state;
  }
}
