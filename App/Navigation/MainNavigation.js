import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import EventScreen from '../Containers/Event';
import EventDetailScreen from '../Containers/Event/EventDetailScreen';
import TrackedEventScreen from '../Containers/Event/TrackedEventScreen';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const MainNav = createStackNavigator(
  {
    EventScreen: {
      screen: EventScreen,
      navigationOptions: {
        header: null,
      },
    },
    EventDetailScreen: {screen: EventDetailScreen},
    TrackedEventScreen: {screen: TrackedEventScreen},
  },
  {
    // Default config for all screens
    // headerMode: 'none',
    initialRouteName: 'EventScreen',
    navigationOptions: {
      headerStyle: styles.header,
    },
  },
);

export default MainNav;
