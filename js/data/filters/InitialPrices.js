import {createSelector} from 'reselect';
import {SYMBOLS} from '../../constants/Config';
import {takeWhile, values} from 'lodash';

const SelectUntil = state => {
  let prices = {};
  takeWhile(state.Ticker.transactions, price => {
    prices[price.ticker] = price;
    return Object.keys(prices).length < SYMBOLS.length;
  })
  return prices;
};

export default createSelector(
  [SelectUntil],
  function(prices) {
    return {prices: values(prices)};
  }
);
