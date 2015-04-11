import React from 'react';
import App from './components/app.jsx';

var scoreboard = document.getElementById('scoreboard'),
    main = document.getElementById('main');

const SYMBOLS = ['GOOG', 'AAPL', 'FB'];
// API Keys
var pubnub = PUBNUB.init({
  subscribe_key : 'demo',
  publish_key   : 'demo'
});

function onStart() {
  pubnub.subscribe({
    channel : SYMBOLS,
    message : onReceiveData
  });
  setTimeout(onStop, 10000);
}

function onStop() {
  pubnub.unsubscribe({
    channel : SYMBOLS
  });
}

function onReceiveData(data, raw, symbol) {
  data.ticker = symbol;
  data.key = data.time+data.ticker+data.price;
  data.category = data.perc < 0 ? 'loss' : 'gain';
  var creator = ParseReact.Mutation.Create('Quote', data);
  creator.dispatch();
}

React.render(<App onStart={onStart} onStop={onStop} />, main);
