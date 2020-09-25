import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import I18n from '../I18n';
import {IdGenerator} from '../Lib';
import {Colors, Fonts, Metrics, Images, AppStyles} from '../Themes';

import {DropDownHolder} from '../Components/DropDownHolder';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  addEventRequest: ['data', 'callback'],
  addEventSuccess: ['payload'],
  addEventFailure: ['error'],
});

export const EventTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const DEFAULT_STATE = {
  data: null,
  fetching: false,
  payload: null,
  error: null,
};

export const INITIAL_STATE = Immutable({
  events: [
    {
      id: IdGenerator(),
      title: 'Metallica Concert',
      place: 'Palace Grounds',
      isFree: false,
      image: Images.metalica,
    },
    {
      id: IdGenerator(),
      title: 'Saree Exhibition',
      place: 'Malleswaram Grounds',
      isFree: true,
      image: Images.saree,
    },
    {
      id: IdGenerator(),
      title: 'Wine tasting event',
      place: 'Links Brewery',
      isFree: false,
      image: Images.wine,
    },
    {
      id: IdGenerator(),
      title: 'Startups Meet',
      place: 'Kanteerava Indoor Stadium',
      isFree: false,
      image: Images.startups,
    },
    {
      id: IdGenerator(),
      title: 'Summer Noon Party',
      place: 'Kumara Park',
      isFree: false,
      image: Images.summer,
    },
    {
      id: IdGenerator(),
      title: 'Rock and Roll nights',
      place: 'Sarjapur Road',
      isFree: false,
      image: Images.rock,
    },
    {
      id: IdGenerator(),
      title: 'Barbecue Fridays',
      place: 'Whitefield',
      isFree: false,
      image: Images.barbecue,
    },
    {
      id: IdGenerator(),
      title: 'Summer workshop',
      place: 'Indiranagar',
      isFree: true,
      image: Images.workshop,
    },
    {
      id: IdGenerator(),
      title: 'Impressions & Expressions',
      place: 'MG Road',
      isFree: true,
      image: Images.impressions,
    },
    {
      id: IdGenerator(),
      title: 'Italian carnival',
      place: 'Electronic City',
      isFree: true,
      image: Images.italian,
    },
  ],

  addEvent: DEFAULT_STATE,
});

/* ------------- Selectors ------------- */

export const EventSelectors = {
  selectEvents: (state) => state.event.events,
};

/* ------------- Reducers ------------- */

export const addEventRequest = (state, {data}) => {
  return state.merge({
    ...state,
    addEvent: {...state.addEvent, fetching: true, data},
  });
};
export const addEventSuccess = (state, {payload}) => {
  DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  let tempData = [...state.events];
  tempData.push(payload);

  return state.merge({
    ...state,
    addEvent: {fetching: false, error: null, payload, data: null},
    events: tempData,
  });
};
export const addEventFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    addEvent: {...state.addEvent, fetching: false, error},
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_EVENT_REQUEST]: addEventRequest,
  [Types.ADD_EVENT_SUCCESS]: addEventSuccess,
  [Types.ADD_EVENT_FAILURE]: addEventFailure,
});
