import Fonts from './Fonts';
import Metrics from './Metrics';
import Colors from './Colors';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  row: {
    flexDirection: 'row',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyEvenly: {
    justifyContent: 'space-evenly',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  positionAbsolute: {
    position: 'absolute',
  },
  shadow: {
    // backgroundColor: Colors.steel,
    shadowColor: Colors.charcoal,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  shadowSmall: {
    // backgroundColor: Colors.steel,
    shadowColor: Colors.charcoal,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
};

export default ApplicationStyles;
