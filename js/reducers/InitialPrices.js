import * as ActionTypes from '../constants/ActionTypes';

let defaultState = {};

export default function(state=defaultState, action) {
  switch(action.type) {
    case ActionTypes.DATA_RECEIVED:
      const {data} = action;
      if (data.ticker && !state.hasOwnProperty(data.ticker)) {
        return {...state, [data.ticker]: data.price};
      }
      return state;
    case ActionTypes.DATA_RESET:
      debugger
      return {};
    default:
      return state;
  }
}
