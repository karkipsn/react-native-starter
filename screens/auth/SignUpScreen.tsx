import * as React from 'react'
import { Button, Text, StyleSheet, TextInput, View, Image } from "react-native";
import { AuthScreenProps } from "../../types";
import {CustomButton} from '../../customComponents/CustomButton'
import  KeyboardAdjustmentView  from '../../customComponents/KeyboardAdjustmentView'


export default ({ navigation }: AuthScreenProps<'SignIn'>) => {

  const handlePress = () => {
    console.log("Sign In Button Pressed")
    navigation.replace('SignIn');
  };

//   const handleSignUpPress = () => {
//     console.log("Sign Up Button Pressed")
//     navigation.replace('SignUp');
//   };

   return (
     <KeyboardAdjustmentView style={styles.container}>

      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../assets/images/splash.png')}
          style={styles.image}
        />
      </View>

       <TextInput style={styles.textInput} 
                placeholder="Enter UserName"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next">
         
       </TextInput>

       <TextInput style={styles.textInput} 
                placeholder="Enter Password"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="done" >
        
       </TextInput>

       <CustomButton onPress={handlePress} textTitle="Sign Up" backgroundColor='blue' radius={40}/>
         
        {/* <CustomButton onPress={handleSignUpPress} textTitle="Sign Up" backgroundColor='red' radius={40}/> */}

     </KeyboardAdjustmentView>
     
   )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#307ecc' 
  },
  textInput: {
    height: 60,
    width: '96%',
    backgroundColor: 'gray',
    borderRadius: 30,
    marginTop: 24,
    marginLeft: 24,
    marginRight: 24,
    padding: 12
  },
  button: {
    width: '96%',
  },

  image: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    margin: 40,
  },
  
});
