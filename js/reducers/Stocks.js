import {DATA_RECEIVED, DATA_RESET} from '../actions/ActionTypes';

let defaultState = {};

export default function(state = defaultState, action) {
  switch (action.type) {
    case DATA_RECEIVED:
      const {ticker, price} = action.payload;
      let newData;
      // TODO: create Stock model
      if (!state[ticker]) {
        newData = {openPrice: price, currentPrice: price, numTrans: 1};
      } else {
        const numTrans = state[ticker].numTrans + 1;
        newData = {...state[ticker], currentPrice: price, numTrans};
      }
      return {...state, [ticker]: newData};
    case DATA_RESET:
      return defaultState;
    default:
      return state;
  }
}
