'use strict';
const args = process.argv.slice(2);
const port = args[0];

const thinky = require('thinky')({
  host: "localhost",
  port: port,
  authKey: "",
  db: "horizon"
});

const type = thinky.type;
const getTransaction = require('./getTransaction');

const Transaction = thinky.createModel('transactions', {
  id: String,
  ticker: String,
  time: String,
  price: Number,
  delta: Number,
  perc: Number,
  vol: Number,
  timestamp: Date
});

const save = data => {
  data.timestamp = new Date();
  const trans = new Transaction(data);
  trans.save().then(
    result => {console.log('SAVE', result)}
  );
};


let interval, running = false;

function start() {
  running = true;
  interval = setInterval(() => {
    const ticker = 'FB'; // getRandomCompany();
    save(getTransaction(ticker));
  }, 250);
  // Transaction.run().then(result => console.log(result, result.length))
}

function stop() {
  running = false;
  clearInterval(interval);
}


start();
