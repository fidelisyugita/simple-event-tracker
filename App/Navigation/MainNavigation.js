import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../Containers/Home';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const MainNav = createStackNavigator(
  {
    HomeScreen: {screen: HomeScreen},
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'HomeScreen',
    navigationOptions: {
      headerStyle: styles.header,
    },
  },
);

export default MainNav;
