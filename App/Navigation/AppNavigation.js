import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import LaunchScreen from '../Containers/LaunchScreen';
import DrawerNav from './DrawerNavigation';
import MainNav from './MainNavigation';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = createSwitchNavigator(
  {
    Init: LaunchScreen,
    App: DrawerNav,
    // Main: MainNav,
  },
  {
    // Default config for all screens
    initialRouteName: 'Init',
  },
);

export default createAppContainer(PrimaryNav);
