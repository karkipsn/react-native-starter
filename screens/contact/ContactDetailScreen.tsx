import React from "react";
import { Text } from "react-native";
import { ContactScreenProps, ContactScreenRouteProp } from '../../types';

export default (
  props: ContactScreenProps<'ContactDetailScreen'>
  // { navigation } : ContactScreenProps<'ContactDetailScreen'>
  ) => {

  // props: ContactScreenProps<'ContactDetailScreen'>

  const contactInfo = props.route.params
  // const contactInfo = {"username": "Test"}

  return <Text>{JSON.stringify(contactInfo, null, 2)}</Text>;
};