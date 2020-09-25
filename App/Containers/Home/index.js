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
} from 'react-native';

import SessionActions from '../../Redux/SessionRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../../Themes';
import I18n from '../../I18n';
import {Scale} from '../../Transforms';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  onLogout = () => {
    const {name} = this.state;
    const {navigation, logout} = this.props;

    logout();
    navigation.navigate('Init');
  };

  render() {
    const {name} = this.state;
    const {navigation, currentUser} = this.props;

    return (
      <SafeAreaView style={AppStyles.flex1}>
        <View
          style={[
            AppStyles.flex1,
            AppStyles.alignCenter,
            AppStyles.justifyCenter,
          ]}>
          <Text>{`${I18n.t('hi')} ${currentUser.name}`}</Text>
        </View>
        <View style={[AppStyles.justifyEnd, AppStyles.alignEnd]}>
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
                margin: Scale(16),
              },
            ]}>
            <Text>{I18n.t('logout')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  console.tron.log({HomeScreen: state});

  let rehydrated = false;
  if (state._persist) {
    rehydrated = state._persist.rehydrated;
  }

  return {
    rehydrated,
    currentUser: state.session.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(SessionActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
