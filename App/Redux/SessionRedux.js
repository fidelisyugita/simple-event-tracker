import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import {IdGenerator} from '../Lib';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  saveUser: ['data'],
  logout: null,
});

export const SessionTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
});

export const logout = (state) => {
  return state.merge({...INITIAL_STATE});
};

/* ------------- Selectors ------------- */

export const SessionSelectors = {
  getUser: (state) => state.session.user,
};

/* ------------- Reducers ------------- */

export const saveUser = (state, {data}) => {
  return state.merge({...state, user: {...data, id: IdGenerator()}});
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_USER]: saveUser,
  [Types.LOGOUT]: logout,
});
