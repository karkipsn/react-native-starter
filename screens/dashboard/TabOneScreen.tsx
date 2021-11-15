import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList, VirtualizedList } from "react-native";
import { RootTabScreenProps } from '../../types';
import { Text, View } from '../../customComponents/Themed';
import { SimpleRow, Separator } from "../../components/Row";
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from "axios"
import {useDispatch, useSelector} from 'react-redux';
import { ADD_ARTICLES } from '../../store/toolkit/slices/articleSlice';
import {useAppDispatch, useAppSelector} from '../../store/toolkit/index'
import { Button, CustomButton}  from '../../customComponents/CustomButton'


export const Item: React.FC<PostRPRender> = ({id, title}) => {
  console.log("Logs", title);
  return (
    <View style={styles.item}>
    
      <Text style={styles.itemName}>{id}</Text>
      <Text style={styles.quantity}>{title}</Text>
    </View>
  );
};

const TabOneScreen = ({ navigation }: RootTabScreenProps<'TabOne'>) => {

const [testdata, setTestData] = React.useState<[PostRP]>();

const articleState = useAppSelector(state => state)

const dispatch = useAppDispatch();
// useDispatch();

const handlePress = () => {
  console.log("Button Pressed")
};

React.useEffect(() => {

  dispatch(ADD_ARTICLES({id: 1, body: "Body test", title: "titlle One"}));


  // console.log(articleState);

    try {
      const data  =  axios.get('https://jsonplaceholder.typicode.com/posts').
      then(response => 
        setTestData(response.data));
       
    } catch (error) {
      console.log(error);
    }
 }, []);


 return (

  <View style = {styles.container}>
    <SafeAreaView>

    <CustomButton onPress={handlePress} textTitle="Text " backgroundColor='red' radius={40}>Button</CustomButton>
    <Button onPress={handlePress} title="Text Button" radius={22}> </Button>

    {/* <FlatList
    data={testdata}
    keyExtractor={(item) => {
      return `${item.id}-${item.title}`;
    }}
    renderItem={({ item }) => {

      let title = item.title
      let subTitle = item.body

      return (
        <SimpleRow
          title= {title ?? ""}
          subtitle= {subTitle ?? ""}
        />
      );
    }}
    ItemSeparatorComponent={Separator}
    ListHeaderComponent={() => <Separator />}
    ListFooterComponent={() => <Separator />}
    contentContainerStyle={{ paddingVertical: 20 }}
  />  */}
      
  </SafeAreaView>
  </View>
 );
}

export const styles = StyleSheet.create({
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
  item: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
  },
  itemName: {
    padding: 20,
    fontWeight: '500',
  },
  quantity: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});

export default TabOneScreen;
