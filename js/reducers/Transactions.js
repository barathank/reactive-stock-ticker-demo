import {DATA_RECEIVED, DATA_RESET} from '../constants/ActionTypes';

let defaultState = {
  all: [],
  byStock: {}
};

export default function(state=defaultState, action) {
  switch(action.type) {
    case DATA_RECEIVED:
      const data = action.payload;
      data.key = data.time+data.ticker+data.price;
      data.category = data.perc < 0 ? 'loss' : 'gain';
      return { ...state, all: [...state.all, action.payload] };
    case DATA_RESET:
      return { all: [], byStock: {} };
    default:
      return state;
  }
}
