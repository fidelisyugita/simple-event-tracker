/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  ScrollView,
  Text,
  Image,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import SessionActions from '../../Redux/SessionRedux';
import TrackedEventActions from '../../Redux/TrackedEventRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

import EventComponent from '../../Components/EventComponent';

class EventDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.navigation.getParam('item', null),
    };
  }

  onTrack = () => {
    const {item} = this.state;
    const {
      navigation,
      currentUser,
      events,
      addTrackedEventRequest,
    } = this.props;

    addTrackedEventRequest({...item, user: currentUser}, this.addCallback);
  };

  addCallback = (res) => {
    const {item} = this.state;

    if (res.ok) {
      console.tron.log({res});
    }
  };

  render() {
    const {item} = this.state;
    const {navigation, currentUser, events, trackedEvents} = this.props;
    const isTracked =
      trackedEvents.findIndex(
        (event) => event.id === item.id && event.user.name === currentUser.name,
      ) > -1;

    return (
      <SafeAreaView style={[AppStyles.flex1]}>
        <EventComponent
          item={item}
          isTracked={isTracked}
          onTrack={this.onTrack}
          // onPress={() => navigation.navigate('EventDetailScreen', {item: item})}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  console.tron.log({EventDetailScreen: state});

  let rehydrated = false;
  if (state._persist) {
    rehydrated = state._persist.rehydrated;
  }

  return {
    rehydrated,
    currentUser: state.session.user,
    events: state.event.events,
    trackedEvents: state.trackedEvent.trackedEvents,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addTrackedEventRequest: (data, callback) =>
    dispatch(TrackedEventActions.addTrackedEventRequest(data, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailScreen);
