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
        <View
          style={[
            AppStyles.flex1,
            AppStyles.shadow,
            {
              margin: Scale(8),
              borderRadius: Scale(8),
            },
          ]}>
          <Image
            source={item.image}
            style={{
              width: '100%',
              height: Scale(250),
              borderTopLeftRadius: Scale(8),
              borderTopRightRadius: Scale(8),
            }}
          />
          <View style={{padding: Scale(12)}}>
            <Text>{item.title}</Text>
            <Text>{item.place}</Text>
            <Text>{item.isFree ? I18n.t('free') : I18n.t('paid')}</Text>

            <TouchableOpacity
              disabled={isTracked}
              onPress={this.onTrack}
              style={[
                AppStyles.alignCenter,
                AppStyles.justifyCenter,
                AppStyles.shadowSmall,
                {
                  width: Scale(100),
                  height: Scale(50),
                  backgroundColor: Colors.snow,
                  borderRadius: Scale(12),
                  marginTop: Scale(12),
                },
              ]}>
              <Text>{isTracked ? I18n.t('tracked') : I18n.t('track')}</Text>
            </TouchableOpacity>
          </View>
        </View>
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
