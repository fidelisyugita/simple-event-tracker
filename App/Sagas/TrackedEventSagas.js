/* eslint-disable curly */
import {call, put, select} from 'redux-saga/effects';

import TrackedEventActions, {
  TrackedEventSelectors,
} from '../Redux/TrackedEventRedux';

import {IdGenerator} from '../Lib';
import I18n from '../I18n';

const {selectTrackedEvents} = TrackedEventSelectors;

export function* addTrackedEvent(api, action) {
  const {data, callback} = action;

  console.tron.log({action});

  try {
    yield put(TrackedEventActions.addTrackedEventSuccess(data));
    if (callback) callback({ok: true});
  } catch (error) {
    yield put(TrackedEventActions.addTrackedEventFailure(error));
    if (callback) callback({ok: false});
  }
}

export function* deleteTrackedEvent(api, action) {
  const {data, callback} = action;
  console.tron.log({data});

  try {
    const oldData = yield select(selectTrackedEvents);
    let newData = [...oldData];
    console.tron.log({before: newData});
    const indexChangedData = newData.findIndex((item) => item.id === data.id);

    console.tron.log({indexChangedData});
    if (indexChangedData > -1) newData.splice(indexChangedData, 1);

    console.tron.log({after: newData});

    yield put(TrackedEventActions.deleteTrackedEventSuccess(newData));
    if (callback) callback({ok: true});
  } catch (error) {
    yield put(TrackedEventActions.deleteTrackedEventFailure(error));
    if (callback) callback({ok: false});
  }
}
