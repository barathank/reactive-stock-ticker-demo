import {createSelector} from 'reselect';
import {SYMBOLS} from '../../constants/Config';

const stocks = state => state.Stocks;
const transactions = state => state.Transactions.all;
const empty = [];
let count = 0;

const qualifyingTransactions = (num) => {
  return createSelector(
    [transactions],
    trans => (trans.length < num) ? empty : trans
  );
};

// TODO: change this to not take a stock, but instead map over them all
const latestTrans = (stock, num) => {
  return createSelector(
    [qualifyingTransactions(num)],
    (trans) => {
      const latest = trans.filter(t => t.ticker === stock);

      if (latest.length < num) {
        return empty;
      }

      return latest.slice(latest.length - num);
    }
  );
};

const getAverge = (trans, stock, num, category) => {
  if (trans === empty) {
    return 0;
  }
  return trans
    .filter(t => t.category === category)
    .map(t => parseFloat(t.delta))
    .reduce((memo, delta) => memo + delta, 0) / num;
};

// http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:relative_strength_index_rsi
//               100
// RSI = 100 - --------
//              1 + RS     where RS = avgGain / avgLoss
export default (stock, num) => {
  return createSelector(
    [latestTrans(stock, num)],
    (trans) => {
      let rsi = 0;
      if (trans !== empty) {
        const avgGains = getAverge(trans, stock, num, 'gain');
        const avgLosses = getAverge(trans, stock, num, 'loss');
        rsi = (avgLosses === 0)
          ? 100
          : 100 - (100 / 1 + (avgGains/avgLosses));
      }

      return {rsi};
    }
  );
};
