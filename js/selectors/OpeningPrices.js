import {createSelector} from 'reselect';

export default createSelector(
  state => state.Stocks,
  stocks => {
    const prices = Object.keys(stocks).map(key =>
      ({key, openPrice: stocks[key].openPrice})
    );

    return {prices};
  }
)
