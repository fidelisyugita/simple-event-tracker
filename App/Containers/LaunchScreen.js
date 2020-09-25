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

import SessionActions from '../Redux/SessionRedux';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../Themes';
import I18n from '../I18n';
import {Scale} from '../Transforms';

class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  componentDidUpdate(nextProps, nextState) {
    const {rehydrated, currentUser} = this.props;

    if (rehydrated) {
      if (currentUser) {
        this.props.navigation.navigate('App');
      }
    }
  }

  onSubmit = () => {
    const {name} = this.state;
    const {navigation, saveUser} = this.props;

    saveUser({name: name});
    setTimeout(() => navigation.navigate('App'), 100);
  };

  render() {
    const {name} = this.state;
    const {navigation} = this.props;

    return (
      <SafeAreaView style={[AppStyles.flex1, {margin: Scale(16)}]}>
        <View
          style={[
            AppStyles.flex1,
            AppStyles.alignCenter,
            // AppStyles.justifyCenter,
            AppStyles.row,
          ]}>
          <Text>{`${I18n.t('name')}: `}</Text>
          <TextInput
            placeholder={I18n.t('typeHere')}
            value={name}
            onChangeText={(text) => this.setState({name: text})}
          />
        </View>
        <View style={[AppStyles.justifyEnd, AppStyles.alignEnd]}>
          <TouchableOpacity
            disabled={name.length < 1}
            onPress={this.onSubmit}
            style={[
              AppStyles.alignCenter,
              AppStyles.justifyCenter,
              AppStyles.shadowSmall,
              {
                width: Scale(100),
                height: Scale(50),
                backgroundColor: name.length < 1 ? Colors.steel : Colors.snow,
                borderRadius: Scale(12),
              },
            ]}>
            <Text>{I18n.t('enter')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  console.tron.log({LaunchScreen: state});

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
  saveUser: (data) => dispatch(SessionActions.saveUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen);
