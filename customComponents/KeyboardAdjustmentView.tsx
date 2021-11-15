import React, { ReactElement } from "react";
import {KeyboardAvoidingView, ScrollView, Platform, ViewStyle} from 'react-native';


export type Props = {
    style?: ViewStyle;
}

const KeyboardAdjustmentView: React.FC<Props>  = ({
    children,
    style
}) => {

    return Platform.OS === "android" ? (
        <ScrollView contentContainerStyle={style} >
          {children}
        </ScrollView>
      ) : (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <ScrollView contentContainerStyle={style} >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      );
};

export default KeyboardAdjustmentView;



