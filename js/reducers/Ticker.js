import {TICKER_STARTED, TICKER_STOPPED} from '../constants/ActionTypes';

let defaultState = {
  recording: false
};

export default function(state=defaultState, action) {
  switch (action.type) {
    case TICKER_STARTED:
      return {...state, recording: true};

    case TICKER_STOPPED:
      return {...state, recording: false};

    default:
      return state;
  }
}
