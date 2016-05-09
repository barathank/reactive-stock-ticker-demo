'use strict';
const getTransaction = require('./getTransaction');
const Thinky = require('thinky');
const args = process.argv.slice(2);
const port = args[0];
const INTERVAL = 250; // ms

const thinky = Thinky({
  host: "localhost",
  port: port,
  authKey: "",
  db: "horizon"
});

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
  (new Transaction(data)).save().then(
    result => {console.log('SAVE', result)}
  );
};


let interval, running = false;

function start() {
  running = true;
  interval = setInterval(() => {
    save(getTransaction());
  }, INTERVAL);
}

function stop() {
  running = false;
  clearInterval(interval);
}

start();
