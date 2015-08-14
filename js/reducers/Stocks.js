import {DATA_RECEIVED, DATA_RESET} from '../constants/ActionTypes';

let defaultState = {};

export default function(state = defaultState, action) {
  switch (action.type) {
    case DATA_RECEIVED:
      const {ticker, price} = action.data;
      let newData;
      // TODO: create Stock model
      if (!state[ticker]) {
        newData = {openPrice: price, currentPrice: price};
      } else {
        newData = {...state[ticker], currentPrice: price};
      }
      return {...state, [ticker]: newData};
    case DATA_RESET:
      return defaultState;
    default:
      return state;
  }
}
