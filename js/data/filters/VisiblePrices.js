import {createSelector} from 'reselect';

export default state => {
  let {all} = state.Transactions;
  all = (all.length < 10)
    ? all
    : all.slice(all.length-10)

  return {transactions: all};
}
