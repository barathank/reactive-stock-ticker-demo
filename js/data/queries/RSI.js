import {createSelector} from 'reselect';

const settings = state => state.Ticker;
const stocks = state => state.Stocks;
const transactions = state => state.Transactions.all;
const empty = [];

const qualifyingStocks = createSelector(
  [stocks, settings],
  (stocks, settings) => {
    return Object.keys(stocks).filter(stock =>
      stocks[stock].numTrans >= settings.minTransactions
    );
  }
);

const latestTrans = createSelector(
  [qualifyingStocks, transactions, settings],
  (stocks, trans, settings) => {
    return stocks.map(stock => {
      const latest = trans.filter(t => t.ticker === stock);
      if (latest.length < settings.minTransactions) {
        return empty;
      }
      return latest.slice(latest.length - settings.minTransactions);
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
  [latestTrans, settings],
  (trans, settings) => {
    const result = trans.map(trans => {
      const {ticker} = trans[0];
      let rsi = 0;
      if (trans !== empty) {
        const avgGains = getAverage(trans, settings.minTransactions, 'gain');
        const avgLosses = getAverage(trans, settings.minTransactions, 'loss');
        // rsi = (avgLosses === 0)
        //   ? 100
        //   : 100 - (100 / 1 + (avgGains/avgLosses));
        rsi = 100 - (100 / 1 + (avgGains/avgLosses));
      }

      rsi = (rsi === 0 || rsi === 100) ? rsi : rsi.toFixed(2);

      return {ticker, rsi};
    });

    return {rsi: result};
  }
);
