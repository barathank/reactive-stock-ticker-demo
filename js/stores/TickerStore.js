import ActionTypes from '../constants/ActionTypes';

let defaultState = {
  recording: false,
  transactions: []
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.TICKER_STARTED:
      state.recording = true;
      return state;
    case ActionTypes.TICKER_STOPPED:
      state.recording = false;
      return state;
    case ActionTypes.DATA_RECEIVED:
      let updated = state.transactions.concat([action.data]);
      if (updated.length > 10) {
        updated = updated.slice(1, updated.length);
      }
      state.transactions = updated;
      return state;
    case ActionTypes.DATA_RESET:
      state.transactions = [];
      return state;
    default:
      return state;
  }
}
