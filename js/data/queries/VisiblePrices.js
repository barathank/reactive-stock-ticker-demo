import {createSelector} from 'reselect';

const getLast13 = trans =>
  trans.length < 13 ? trans : trans.slice(trans.length - 13);

export default state => {
  return {
    transactions: getLast13(state.Transactions)
  };
}
