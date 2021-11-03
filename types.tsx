/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Auth: NavigatorScreenParams<AuthParamList> | undefined;
  Contact: NavigatorScreenParams<ContactParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TabContact: NavigatorScreenParams<ContactParamList> | undefined;
  TabSettings: undefined;
};

export type ContactParamList = {
  ContactList: undefined,
  ContactDetailScreen: any;
}

export type ActionParamList = {
  ActiontList: undefined,
  Modal: undefined;
  ActionDetails: {} | undefined;
}

export type AuthParamList = {
  SignIn: undefined,
  SignUp: undefined,
  ForgotPassword: undefined
}

export type SettingsParamList = {
  Settings: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type AuthScreenProps<Screen extends keyof AuthParamList> = NativeStackScreenProps<
  AuthParamList, 
  Screen
>;

export type ContactScreenProps<Screen extends keyof ContactParamList> = NativeStackScreenProps<
  ContactParamList, 
  Screen
>;

export type ActionScreenProps<Screen extends keyof ActionParamList> = NativeStackScreenProps<
  ActionParamList, 
  Screen
>;

export type SettingScreenProps<Screen extends keyof SettingsParamList> = NativeStackScreenProps<
  SettingsParamList, 
  Screen
>;

// export type ContactScreenRouteProp = RouteProp<ContactParamList, 'ContactDetailScreen'>;

export type ContactScreenRouteProp<Screen extends keyof ContactParamList> = RouteProp<
  ContactParamList, 
  Screen
>;


export type ContactInfo = {
  gender:   string;
  name:     Name;
  location: Location;
}

export type Location = {
  street:      Street;
  city:        string;
  state:       string;
  country:     string;
  postcode:    number;
  coordinates: Coordinates;
  timezone:    Timezone;
}

export type Coordinates = {
  latitude:  string;
  longitude: string;
}

export type Street = {
  number: number;
  name:   string;
}

export type Timezone = {
  offset:      string;
  description: string;
}

export type Name = {
  title: string;
  first: string;
  last:  string;
}
