import {createSelector} from 'reselect';

export default createSelector(
  state => state.Transactions,
  trans => ({
      transactions: trans.length < 13
        ? trans
        : trans.slice(trans.length - 13)
  })
)
