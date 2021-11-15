import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../customComponents/Themed';
import {useDispatch, useSelector} from 'react-redux';
import { ADD_ARTICLES, REMOVE_ARTICLES } from '../../store/toolkit/slices/articleSlice';
import {useAppDispatch, useAppSelector} from '../../store/toolkit/index'

const TabTwoScreen = () => {

const articleState = useSelector(state => state);

const dispatch = useAppDispatch();

  React.useEffect(() => {

    // dispatch(ADD_ARTICLES({id: 43, body: "Body Two", title: "titlle Two"}));
    dispatch(REMOVE_ARTICLES({ id: 4, body: "Body Two", title: "titlle Two" }))

  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default TabTwoScreen;
