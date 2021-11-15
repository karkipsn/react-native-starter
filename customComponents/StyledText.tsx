import * as React from 'react';
import { Text } from './Themed';
import {  TextProps } from './types';
import { StyleSheet } from 'react-native';


// Text with Mono Styled color.
export const MonoText = (props: TextProps) => {
  return <Text {...props} style={[props.style, styles.monoText]} />;
}

// Bold text with Style of Red Color.
export const BoldText = (props: TextProps) => {
  return <Text {...props} style={[props.style, styles.boldText]} />;
}

// Custom RoundLabelText by inheriting textprops
export const RoundLabelText = (props: TextProps) =>{
  return <Text {...props} style={[props.style, styles.roundText]}  />
}

const styles = StyleSheet.create ({
  boldText: {
     padding: 4, 
     fontWeight: 'bold', 
     backgroundColor: 'red', 
     borderRadius: 40, 
     color: 'white' 
    },
  monoText: {
    fontFamily: 'space-mono', 
    borderRadius: 40
  },
  roundText: {
    backgroundColor: 'blue', 
    borderRadius: 12, 
    shadowColor: 'gray', 
    shadowRadius: 2,
  }

})
