import {createSelector} from 'reselect';

export default state => {
  const {all} = state.Transactions;
  const transactions = (all.length < 10)
    ? all
    : all.slice(all.length-10)

  return {transactions};
}
