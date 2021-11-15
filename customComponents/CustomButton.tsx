
import {CustomTouchableOpacityProps, 
    CustomButtonProps } from './types';

import * as React from 'react';

import { View, 
    StyleSheet, 
    Platform,
    TouchableOpacity, 
    TouchableNativeFeedback,
    Text, 
    Pressable, 
    TouchableOpacityProps } from "react-native";


/* Using Pressable */
export const Button = (props: CustomButtonProps) => {

    return (
      <Pressable style={[styles.button, {borderRadius: props.radius}]} onPress={props.onPress}>
        <Text style={styles.text}>{props.title}</Text>
      </Pressable>
    );
  }

  /* Using TouichableOpacity and merging the new required props to the props of the */
  export const CustomButton = (props: CustomTouchableOpacityProps) => {

    if (Platform.OS == 'ios') {

        return (
            <View style={styles.container}>
                    
              <TouchableOpacity {...props} onPress={props.onPress} style={[ styles.button, 
              {borderRadius: props.radius? props.radius: 20, width: "90%", backgroundColor: props.backgroundColor } ]} >
          
                  <Text style={styles.customBtnText}>{props.textTitle}</Text>
          
              </TouchableOpacity>
              </View>
              )
    } else {
        return (
            <View style={styles.container}>
                    
              <TouchableNativeFeedback {...props} onPress={props.onPress} style={[ styles.button, 
              {borderRadius: props.radius? props.radius: 20, width: "90%", backgroundColor: props.backgroundColor } ]} >
          
                  <Text style={styles.customBtnText}>{props.textTitle}</Text>
          
              </TouchableNativeFeedback>
              </View>
              )
    }

  }

// these styles are taken as default values
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    customBtnBG: {
        backgroundColor: "#007aff",
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 30
    },
  
    customBtnText: {
        fontSize: 40,
        fontWeight: '400',
        color: "#fff",
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'red',
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
  });

  export default {CustomButton, Button};