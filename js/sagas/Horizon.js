import { eventChannel, END, takeLatest } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import * as ActionTypes from '../constants/ActionTypes';
import * as TickerActions from '../actions/TickerActions';


const PREFIX = '@horizon';
const getType = (suffix) =>
  [PREFIX, suffix].join('.');

const defaultConfig = {host: 'localhost:8181', authType: 'unauthenticated'};

const TickerClient = (config=defaultConfig) => {
  const COLLECTION = 'transactions';
  const subscriptions = {};
  const instance = Horizon(config);
  let activeListener;

  return {
    connect() {
      return new Promise((resolve, reject) => {
        try {
          instance.connect();
          instance.onReady(resolve);
        } catch(err) {
          console.error('Horizon connection FAILED', err);
          reject(err);
        }
      });
    },

    watch: function() {
      return eventChannel(listener => {
        activeListener = listener;
        subscriptions[COLLECTION] = instance(COLLECTION)
          .watch({ rawChanges: true })
          .subscribe(function ({new_val, type}) {
            if (type === 'add') {
              listener(new_val);
            }
          });

        return () => {
          /* unsubscribe would go here */
        };
      });
    },

    unwatch() {
      activeListener(END);
      const sub = subscriptions[COLLECTION];
      delete subscriptions[COLLECTION];
      sub.unsubscribe();
    }
  };
};


export function* handleAppInit(client) {
  yield take(ActionTypes.APP_STARTED);
  yield call(client.connect);
  yield put({
    type: getType('ready'), payload: client
  });
}

function* handleTransactionEvents(client) {
  const channel = yield call(client.watch);
  try {
    while (true) {
      let action = yield take(channel);
      yield put({type: ActionTypes.DATA_RECEIVED, payload: action})
    }
  } finally {
    channel.close();
  }
}

export function* handleTickerStart(client) {
  while (true) {
    yield take(ActionTypes.TICKER_STARTED);
    yield handleTransactionEvents(client);
  }
}

export function* handleTickerStop(client) {
  while(true) {
    yield take(ActionTypes.TICKER_STOPPED);
    yield call(client.unwatch);
  }
}

export default function* () {
  const client = TickerClient();

  yield [
    handleAppInit(client),
    handleTickerStart(client),
    handleTickerStop(client)
  ];
}
