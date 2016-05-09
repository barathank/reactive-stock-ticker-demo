import {DATA_RECEIVED, DATA_RESET} from '../actions/ActionTypes';

let defaultState = [];

export default function(state=defaultState, action) {
  switch(action.type) {
    case DATA_RECEIVED:
      const data = action.payload;
      data.key = data.time+data.ticker+data.price;
      data.category = data.perc < 0 ? 'loss' : 'gain';
      return [...state, action.payload];
    case DATA_RESET:
      return defaultState;
    default:
      return state;
  }
}
