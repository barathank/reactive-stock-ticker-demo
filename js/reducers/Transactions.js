import {DATA_RECEIVED, DATA_RESET} from '../constants/ActionTypes';

let defaultState = {
  all: [],
  byStock: {}
};

export default function(state=defaultState, action) {
  switch(action.type) {
    case DATA_RECEIVED:
      return { ...state, all: [...state.all, action.data] };
    case DATA_RESET:
      return { all: [], byStock: {} };
    default:
      return state;
  }
}
