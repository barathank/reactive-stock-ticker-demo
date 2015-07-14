import * as ActionTypes from '../constants/ActionTypes';

let defaultState = {
  recording: false,
  transactions: []
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.TICKER_STARTED:
      return { ...state, recording: true };

    case ActionTypes.TICKER_STOPPED:
      return { ...state, recording: false };

    case ActionTypes.DATA_RECEIVED:
      let updated = state.transactions.concat([action.data]);
      if (updated.length > 10) {
        updated = updated.slice(1, updated.length);
      }
      return { ...state, transactions: updated };

    case ActionTypes.DATA_RESET:
      return { ...state, transactions: [] };

    default:
      return state;
  }
}
