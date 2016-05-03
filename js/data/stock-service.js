// Adapted from https://github.com/pubnub/real-time-stocks/blob/master/php-broadcaster/stock.php

let PRICES = {
  FB: 107.92,
  HUBS: 40.62,
  GOOG: 705.07,
  AAPL: 96.91
};

const VOLATILITY = 100;
const COMPANIES = Object.keys(PRICES);

const updatePrice = (ticker, change) => {
  const newPrice = PRICES[ticker] + change;
  PRICES = {...PRICES, [ticker]: newPrice};
  return newPrice;
}

const getRandomCompany = () =>
  COMPANIES[getRandomInt(0, COMPANIES.length)];

const getRandom = (min, max) =>
  Math.random() * (max - min) + min;

const getRandomInt = (min, max) =>
  Math.floor(getRandom(min, max));

const getRandomChange = () =>
  (getRandom(0, VOLATILITY) - (VOLATILITY/2))/100;

const percentChanged = (oldPrice, newPrice) =>
  formatMoney((1 - (oldPrice / newPrice)) * 100)

const formatTime = date =>
  date.toLocaleTimeString().toLowerCase();

const formatMoney = num =>
  num.toFixed(2);


export default function getTicker(dispatch) {
  let interval, running = false;

  const getTransaction = ticker => {
    const vol = getRandom(100, 1000) * 10;
    const time = formatTime(new Date());
    const change = getRandomChange();
    const currPrice = PRICES[ticker];
    const price = formatMoney(updatePrice(ticker, change));
    const perc = percentChanged(currPrice, price);
    const delta = formatMoney(change);

    return {
      ticker, time, price, delta, perc, vol
    };
  };

  return {
    start() {
      running = true;
      interval = setInterval(() => {
        const ticker = getRandomCompany();
        dispatch({
          type: '@horizon.store',
          payload: {
            collection: 'transactions',
            data: getTransaction(ticker)
          }
        });
      }, 250);
    },

    stop() {
      running = false;
      clearInterval(interval);
    }
  }
}
