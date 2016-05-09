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

    watch(query) {
      return eventChannel(emit => {
        const subscription = query(horizon)
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
  const channel = yield call(client.watch, horizon =>
    horizon('transactions').above({timestamp: new Date()})
  );

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
