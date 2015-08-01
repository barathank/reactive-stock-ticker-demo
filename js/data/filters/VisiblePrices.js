import {createSelector} from 'reselect';

export default state => {
  const {transactions} = state.Ticker;
  if (transactions.length < 10) {return state.Ticker;}

  return {
    ...state.Ticker,
    transactions: transactions.slice(transactions.length-10)
  };
}
