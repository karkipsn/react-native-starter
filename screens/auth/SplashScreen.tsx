import React, {useState, useEffect} from 'react';
import { RootStackScreenProps } from "../../types";
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';


const SplashScreen = ({navigation}: RootStackScreenProps<'Splash'>) => {

  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      /**
       * Condition checking for token and all 
       */
    //   navigation.replace(check for condition? 'Auth' : 'Root'),
      navigation.replace('Auth')
      
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/splash.png')}
        style={styles.image}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  image: {
      width: '90%', 
      resizeMode: 'contain', 
      margin: 30}
});