import {createSelector} from 'reselect';
import {SYMBOLS} from '../../constants/Config';
import {values} from 'lodash';

export default state => {
  const prices = Object.keys(state.Stocks).map(key =>
    ({key, openPrice: state.Stocks[key].openPrice})
  );

  return {prices};
}
