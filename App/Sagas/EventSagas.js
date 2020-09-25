/* eslint-disable curly */
import {call, put, select} from 'redux-saga/effects';

import EventActions, {EventSelectors} from '../Redux/EventRedux';

import {IdGenerator} from '../Lib';
import I18n from '../I18n';

const {selectEvents} = EventSelectors;

export function* addEvent(api, action) {
  const {data, callback} = action;

  console.tron.log({action});

  try {
    yield put(EventActions.addEventSuccess({...data, id: IdGenerator()}));
    if (callback) callback({ok: true});
  } catch (error) {
    yield put(EventActions.addEventFailure(error));
    if (callback) callback({ok: false});
  }
}
