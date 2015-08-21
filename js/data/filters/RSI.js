import {createSelector} from 'reselect';
import {SYMBOLS} from '../../constants/Config';

const MIN_TRANSACTIONS = 4;

const stocks = state => state.Stocks;
const transactions = state => state.Transactions.all;
const empty = [];

const qualifyingStocks = createSelector(
  [stocks],
  stocks => {
    return Object.keys(stocks).filter(stock =>
      stocks[stock].numTrans >= MIN_TRANSACTIONS
    );
    // debugger
    // return results.length ? results : empty;
  }
);

const latestTrans = createSelector(
  [qualifyingStocks, transactions],
  (stocks, trans) => {
    return stocks.map(stock => {
      const latest = trans.filter(t => t.ticker === stock);
      if (latest.length < MIN_TRANSACTIONS) {
        return empty;
      }
      return latest.slice(latest.length - MIN_TRANSACTIONS);
    });
  }
);

const getAverage = (trans, num, category) => {
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
export default createSelector(
  [latestTrans],
  (trans) => {
    const result = trans.map(trans => {
      const {ticker} = trans[0];
      let rsi = 0;
      if (trans !== empty) {
        const avgGains = getAverage(trans, MIN_TRANSACTIONS, 'gain');
        const avgLosses = getAverage(trans, MIN_TRANSACTIONS, 'loss');
        rsi = (avgLosses === 0)
          ? 100
          : 100 - (100 / 1 + (avgGains/avgLosses));
      }

      rsi = rsi !== 0 ? rsi.toFixed(4) : 0;

      return {ticker, rsi};
    });

    return {rsi: result};
  }
);
