import { eventChannel, END } from 'redux-saga';
import { call, put, race, take } from 'redux-saga/effects';
import * as ActionTypes from '../constants/ActionTypes';
import * as TickerActions from '../actions/TickerActions';


const PREFIX = '@horizon';
const getType = (suffix) =>
  [PREFIX, suffix].join('.');

const defaultConfig = {host: 'localhost:8181', authType: 'unauthenticated'};

const TickerClient = (config=defaultConfig) => {
  const instance = Horizon(config);

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

    watch() {
      return eventChannel(listener => {
        const subscription = instance('transactions')
          .watch({ rawChanges: true })
          .subscribe(function ({new_val, type}) {
            if (type === 'add') {
              listener(new_val);
            }
          });

        // return unsubscribe func
        return () => {
          subscription.unsubscribe();
        };
      });
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

export function* handleTicker(client) {
  while (true) {
    yield take(ActionTypes.TICKER_STARTED);
    yield race({
      ticker: call(handleTransactionEvents, client),
      cancel: take(ActionTypes.TICKER_STOPPED)
    });
  }
}

export default function* () {
  const client = TickerClient();

  yield [
    handleAppInit(client),
    handleTicker(client)
  ];
}
