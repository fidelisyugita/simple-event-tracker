import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import I18n from '../I18n';
import {IdGenerator} from '../Lib';
import {Colors, Fonts, Metrics, Images, AppStyles} from '../Themes';

import {DropDownHolder} from '../Components/DropDownHolder';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  addTrackedEventRequest: ['data', 'callback'],
  addTrackedEventSuccess: ['payload'],
  addTrackedEventFailure: ['error'],

  deleteTrackedEventRequest: ['data', 'callback'],
  deleteTrackedEventSuccess: ['payload'],
  deleteTrackedEventFailure: ['error'],
});

export const TrackedEventTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const DEFAULT_STATE = {
  data: null,
  fetching: false,
  payload: null,
  error: null,
};

export const INITIAL_STATE = Immutable({
  trackedEvents: [],

  addTrackedEvent: DEFAULT_STATE,
  deleteTrackedEvent: DEFAULT_STATE,
});

/* ------------- Selectors ------------- */

export const TrackedEventSelectors = {
  selectTrackedEvents: (state) => state.trackedEvent.trackedEvents,
};

/* ------------- Reducers ------------- */

export const addTrackedEventRequest = (state, {data}) => {
  return state.merge({
    ...state,
    addTrackedEvent: {...state.addTrackedEvent, fetching: true, data},
  });
};
export const addTrackedEventSuccess = (state, {payload}) => {
  DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  let tempData = [...state.trackedEvents];
  tempData.push(payload);

  return state.merge({
    ...state,
    addTrackedEvent: {fetching: false, error: null, payload, data: null},
    trackedEvents: tempData,
  });
};
export const addTrackedEventFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    addTrackedEvent: {...state.addTrackedEvent, fetching: false, error},
  });
};

export const deleteTrackedEventRequest = (state, {data}) => {
  return state.merge({
    ...state,
    deleteTrackedEvent: {...state.deleteTrackedEvent, fetching: true, data},
  });
};
export const deleteTrackedEventSuccess = (state, {payload}) => {
  DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  return state.merge({
    ...state,
    deleteTrackedEvent: {fetching: false, error: null, payload, data: null},
    trackedEvents: payload,
  });
};
export const deleteTrackedEventFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    deleteTrackedEvent: {...state.deleteTrackedEvent, fetching: false, error},
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_TRACKED_EVENT_REQUEST]: addTrackedEventRequest,
  [Types.ADD_TRACKED_EVENT_SUCCESS]: addTrackedEventSuccess,
  [Types.ADD_TRACKED_EVENT_FAILURE]: addTrackedEventFailure,

  [Types.DELETE_TRACKED_EVENT_REQUEST]: deleteTrackedEventRequest,
  [Types.DELETE_TRACKED_EVENT_SUCCESS]: deleteTrackedEventSuccess,
  [Types.DELETE_TRACKED_EVENT_FAILURE]: deleteTrackedEventFailure,
});
