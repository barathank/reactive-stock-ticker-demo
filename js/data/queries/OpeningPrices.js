import {createSelector} from 'reselect';
import {values} from 'lodash';

export default state => {
  const prices = Object.keys(state.Stocks).map(key =>
    ({key, openPrice: state.Stocks[key].openPrice})
  );

  return {prices};
}
