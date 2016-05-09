import { eventChannel, END } from 'redux-saga';
import { call, put, race, take } from 'redux-saga/effects';
import * as ActionTypes from '../actions/ActionTypes';
import * as TickerActions from '../actions/TickerActions';

const defaultConfig = {
  host: 'localhost:8181',
  authType: 'unauthenticated'
};

const TickerClient = (config=defaultConfig) => {
  const horizon = Horizon(config);
  const collection = horizon('transactions');

  return {
    connect() {
      return new Promise((resolve, reject) => {
        try {
          horizon.connect();
          horizon.onReady(resolve);
        } catch(err) {
          console.error('Horizon connection FAILED', err);
          reject(err);
        }
      });
    },

    watch() {
      return eventChannel(emit => {
        const subscription = collection
          .above({timestamp: new Date()})
          .watch({ rawChanges: true })
          .subscribe(({new_val, type}) => {
            if (type === 'add') {
              emit(new_val);
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
    type: '@horizon.ready', payload: client
  });
}

function* handleTransactionStream(client) {
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

export function* handleTickerStarted(client) {
  while (true) {
    yield take(ActionTypes.TICKER_STARTED);
    // TICKER_STOPPED action cancels the stream subscription
    yield race({
      ticker: call(handleTransactionStream, client),
      cancel: take(ActionTypes.TICKER_STOPPED)
    });
  }
}

export default function* () {
  const client = TickerClient();

  yield [
    handleAppInit(client),
    handleTickerStarted(client)
  ];
}
