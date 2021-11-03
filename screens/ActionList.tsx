import React from "react";
import { View, Button } from "react-native";
import { ActionScreenProps } from "../types";

export default ({ navigation }: ActionScreenProps<'ActiontList'>) => (
  <View style={{ flex: 1 }}>
    <Button title="Open Modal" onPress={() => navigation.navigate("Modal")} />
    <Button title="Open Alert" onPress={() => navigation.navigate("ActionDetails")} />
  </View>
);