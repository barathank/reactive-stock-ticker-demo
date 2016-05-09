import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import * as ActionTypes from '../constants/ActionTypes';
import * as TickerActions from '../actions/TickerActions';


const PREFIX = '@horizon';
const getType = (suffix) =>
  [PREFIX, suffix].join('.');

const defaultConfig = {host: 'localhost:8181', authType: 'unauthenticated'};

const TickerClient = (dispatch, config=defaultConfig) => {
  const COLLECTION = 'transactions';
  const subscriptions = {};
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
      subscriptions[COLLECTION] = instance(COLLECTION)
        .watch({ rawChanges: true })
        .subscribe(function ({new_val, type}) {
          if (type === 'add') {
            dispatch({
              type: getType(COLLECTION + '.added'),
              payload: new_val
            });
          }
        });
    },

    unwatch() {
      const sub = subscriptions[COLLECTION];
      delete subscriptions[COLLECTION];
      sub.unsubscribe();
    }
  };
};


export function* handleAppInit(client) {
  while(true) {
    yield takeLatest(ActionTypes.APP_STARTED, function*() {
      yield call(client.connect);
      yield put({
        type: getType('ready'), payload: client
      });
    });
  }
}

export function* handleTickerToggle(client) {
  while (true) {
    yield take(ActionTypes.TICKER_STARTED);
    yield call(client.watch);
    yield take(ActionTypes.TICKER_STOPPED);
    yield call(client.unwatch);
  }
}

export default function* ({dispatch}) {
  const subscriptions = {};
  const client = TickerClient(dispatch);

  yield [
    handleAppInit(client),
    handleTickerToggle(client)
  ];
}
