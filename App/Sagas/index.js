import {takeLatest, all} from 'redux-saga/effects';
import API from '../Services/Api';
import FixtureAPI from '../Services/FixtureApi';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import {StartupTypes} from '../Redux/StartupRedux';
import {GithubTypes} from '../Redux/GithubRedux';

import {EventTypes} from '../Redux/EventRedux';
import {TrackedEventTypes} from '../Redux/TrackedEventRedux';

/* ------------- Sagas ------------- */

import {startup} from './StartupSagas';
import {getUserAvatar} from './GithubSagas';

import {addEvent} from './EventSagas';
import {addTrackedEvent, deleteTrackedEvent} from './TrackedEventSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),

    takeLatest(EventTypes.ADD_EVENT_REQUEST, addEvent, api),

    takeLatest(
      TrackedEventTypes.ADD_TRACKED_EVENT_REQUEST,
      addTrackedEvent,
      api,
    ),
    takeLatest(
      TrackedEventTypes.DELETE_TRACKED_EVENT_REQUEST,
      deleteTrackedEvent,
      api,
    ),
  ]);
}
