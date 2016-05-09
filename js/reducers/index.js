import { combineReducers } from 'redux';
import Ticker from './Ticker';
import Stocks from './Stocks';
import Transactions from './Transactions';

export default combineReducers({
  Ticker, Stocks, Transactions
});
