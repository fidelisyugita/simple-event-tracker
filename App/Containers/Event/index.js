/* eslint-disable curly */
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
import EventActions from '../../Redux/EventRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

import EventComponent from '../../Components/EventComponent';

class EventScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGridView: false,
      isSortByName: false,
      isSortByPlace: false,
    };
  }

  onLogout = () => {
    const {navigation, logout} = this.props;

    logout();
    navigation.navigate('Init');
  };

  renderEvent(data, numColumns) {
    const {navigation} = this.props;
    const {isSortByName, isSortByPlace} = this.state;
    if (isSortByName) data = data.sort((a, b) => a.title > b.title);
    if (isSortByPlace) data = data.sort((a, b) => a.place > b.place);

    return (
      <FlatList
        style={{marginTop: Scale(16)}}
        data={data}
        numColumns={numColumns}
        keyExtractor={(item, index) => item + index}
        renderItem={({item, index}) => (
          <EventComponent
            item={item}
            onPress={() =>
              navigation.navigate('EventDetailScreen', {item: item})
            }
          />
        )}
      />
    );
  }

  render() {
    const {isGridView, isSortByName, isSortByPlace} = this.state;
    const {navigation, currentUser, events} = this.props;
    const data = [...events];

    return (
      <SafeAreaView style={[AppStyles.flex1]}>
        <View
          style={[
            AppStyles.justifyEnd,
            AppStyles.alignCenter,
            AppStyles.row,
            {margin: Scale(16)},
          ]}>
          <TouchableOpacity
            style={{padding: Scale(12)}}
            onPress={() => navigation.navigate('TrackedEventScreen')}>
            <Text>{`${I18n.t('hi')} ${currentUser.name}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onLogout}
            style={[
              AppStyles.alignCenter,
              AppStyles.justifyCenter,
              AppStyles.shadowSmall,
              {
                width: Scale(100),
                height: Scale(50),
                backgroundColor: Colors.snow,
                borderRadius: Scale(12),
              },
            ]}>
            <Text>{I18n.t('logout')}</Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            AppStyles.justifyEvenly,
            AppStyles.alignCenter,
            AppStyles.row,
          ]}>
          <TouchableOpacity
            onPress={() =>
              this.setState({isSortByName: true, isSortByPlace: false})
            }
            style={[
              AppStyles.alignCenter,
              AppStyles.justifyCenter,
              AppStyles.shadowSmall,
              {
                width: Scale(100),
                height: Scale(50),
                backgroundColor: isSortByName ? Colors.steel : Colors.snow,
                borderRadius: Scale(12),
                marginTop: Scale(12),
              },
            ]}>
            <Text>{I18n.t('name')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.setState({isSortByName: false, isSortByPlace: true})
            }
            style={[
              AppStyles.alignCenter,
              AppStyles.justifyCenter,
              AppStyles.shadowSmall,
              {
                width: Scale(100),
                height: Scale(50),
                backgroundColor: isSortByPlace ? Colors.steel : Colors.snow,
                borderRadius: Scale(12),
                marginTop: Scale(12),
              },
            ]}>
            <Text>{I18n.t('place')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.setState({isGridView: !isGridView})}
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
            <Text>{!isGridView ? I18n.t('gridView') : I18n.t('listView')}</Text>
          </TouchableOpacity>
        </View>

        {isGridView && this.renderEvent(data, 2)}
        {!isGridView && this.renderEvent(data, 1)}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  console.tron.log({EventScreen: state});

  let rehydrated = false;
  if (state._persist) {
    rehydrated = state._persist.rehydrated;
  }

  return {
    rehydrated,
    currentUser: state.session.user,
    events: state.event.events,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(SessionActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventScreen);
