/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {Colors, Fonts, Metrics, Images, AppStyles} from '../Themes';
import I18n from '../I18n';
import {Scale} from '../Transforms';

export default class EventComponent extends Component {
  static defaultProps = {
    onDelete: null,
    onTrack: null,
    isTracked: false,
  };

  static propTypes = {
    item: PropTypes.object.isRequired,
    onPress: PropTypes.func,
    onDelete: PropTypes.func,
    onTrack: PropTypes.func,
    isTracked: PropTypes.bool,
  };

  render() {
    const {item, onPress, onDelete, onTrack, isTracked} = this.props;

    if (!item) return;

    return (
      <TouchableOpacity
        onPress={onPress}
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

          {(onDelete || onTrack) && (
            <TouchableOpacity
              onPress={onDelete || onTrack}
              disabled={isTracked}
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
              {onDelete ? (
                <Text>{I18n.t('remove')}</Text>
              ) : (
                <Text>{isTracked ? I18n.t('tracked') : I18n.t('track')}</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}
