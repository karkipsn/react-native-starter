/**
 * Exploring the deep link but currently not used in the application.
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import NotFoundScreen from '../screens/deeplink/NotFoundScreen';
import { RootStackParamList } from '../types';

/**
 * Can jump into any of the screen/page/routes from the depp link url.
 */

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
          TabContact: {
            screens: {
              ContactList: 'contact',
            },
          },
          TabSettings: {
            screens: {
              Settings: 'setting',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*'
    },
  },
};

export default linking;
