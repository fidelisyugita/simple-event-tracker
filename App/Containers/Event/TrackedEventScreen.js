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
import TrackedEventActions from '../../Redux/TrackedEventRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

import EventComponent from '../../Components/EventComponent';

class TrackedEventScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGridView: false,
      isSortByName: false,
      isSortByPlace: false,
    };
  }

  onDelete(item) {
    const {
      navigation,
      currentUser,
      events,
      deleteTrackedEventRequest,
    } = this.props;

    deleteTrackedEventRequest(item, this.deleteCallback);
  }

  deleteCallback = (res) => {
    const {item} = this.state;

    if (res.ok) {
      console.tron.log({res});
    }
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
            onDelete={() => this.onDelete(item)}
          />
          // <TouchableOpacity
          //   onPress={() =>
          //     navigation.navigate('EventDetailScreen', {item: item})
          //   }
          //   style={[
          //     AppStyles.flex1,
          //     AppStyles.shadow,
          //     {
          //       margin: Scale(8),
          //       borderRadius: Scale(8),
          //     },
          //   ]}>
          //   <Image
          //     source={item.image}
          //     style={{
          //       width: '100%',
          //       height: Scale(150),
          //       borderTopLeftRadius: Scale(8),
          //       borderTopRightRadius: Scale(8),
          //     }}
          //   />
          //   <View style={{padding: Scale(12)}}>
          //     <Text>{item.title}</Text>
          //     <Text>{item.place}</Text>
          //     <Text>{item.isFree ? I18n.t('free') : I18n.t('paid')}</Text>

          //     <TouchableOpacity
          //       onPress={() => this.onDelete(item)}
          //       style={[
          //         AppStyles.alignCenter,
          //         AppStyles.justifyCenter,
          //         AppStyles.shadowSmall,
          //         {
          //           width: Scale(100),
          //           height: Scale(50),
          //           backgroundColor: Colors.snow,
          //           borderRadius: Scale(12),
          //           marginTop: Scale(12),
          //         },
          //       ]}>
          //       <Text>{I18n.t('remove')}</Text>
          //     </TouchableOpacity>
          //   </View>
          // </TouchableOpacity>
        )}
      />
    );
  }

  render() {
    const {isGridView, isSortByName, isSortByPlace} = this.state;
    const {navigation, currentUser, trackedEvents} = this.props;
    const data = [...trackedEvents].filter(
      (event) => event.user.name === currentUser.name,
    );

    return (
      <SafeAreaView style={[AppStyles.flex1]}>
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
  console.tron.log({TrackedEventScreen: state});

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
  deleteTrackedEventRequest: (data, callback) =>
    dispatch(TrackedEventActions.deleteTrackedEventRequest(data, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackedEventScreen);
