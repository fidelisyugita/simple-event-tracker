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
import {createDrawerNavigator} from 'react-navigation-drawer';

import TrackedEventActions from '../Redux/TrackedEventRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../Themes';
import I18n from '../I18n';
import {Scale} from '../Transforms';

import MainNav from './MainNavigation';
import EventScreen from '../Containers/Event';
import EventDetailScreen from '../Containers/Event/EventDetailScreen';

import styles from './Styles/NavigationStyles';

const CustomDrawerContentComponent = (props) => (
  <SafeAreaView>
    <Text>
      Ex reprehenderit adipisicing commodo ut eiusmod incididunt pariatur non
      reprehenderit aliqua ipsum excepteur officia.
    </Text>
    <FlatList
      style={{marginTop: Scale(16)}}
      data={props.events || []}
      keyExtractor={(item, index) => item + index}
      renderItem={({item, index}) => (
        <TouchableOpacity
          // onPress={() =>
          //   navigation.navigate('EventDetailScreen', {item: item})
          // }
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
              height: Scale(150),
              borderTopLeftRadius: Scale(8),
              borderTopRightRadius: Scale(8),
            }}
          />
          <View style={{padding: Scale(12)}}>
            <Text>{item.title}</Text>
            <Text>{item.place}</Text>
            <Text>{item.isFree ? I18n.t('free') : I18n.t('paid')}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  </SafeAreaView>
);

const DrawerNav = createDrawerNavigator(
  {
    Main: MainNav,
  },
  {
    // Default config for all screens
    // headerMode: 'none',
    initialRouteName: 'Main',
    navigationOptions: {
      headerStyle: styles.header,
    },
    contentComponent: CustomDrawerContentComponent,
    drawerPosition: 'right',
  },
);

// export default DrawerNav;

const mapStateToProps = (state) => {
  console.tron.log({DrawerNav: state});

  let rehydrated = false;
  if (state._persist) {
    rehydrated = state._persist.rehydrated;
  }

  return {
    rehydrated,
    currentUser: state.session.user,
    trackedEvents: state.trackedEvent.trackedEvents,
    events: state.event.events,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteTrackedEventRequest: (data, callback) =>
    dispatch(TrackedEventActions.deleteTrackedEventRequest(data, callback)),
  addTrackedEventRequest: (data, callback) =>
    dispatch(TrackedEventActions.addTrackedEventRequest(data, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNav);
