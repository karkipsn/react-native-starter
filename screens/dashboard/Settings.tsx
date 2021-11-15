import * as React from 'react';
import { FlatList, VirtualizedList, ListRenderItemInfo } from "react-native";
import { RootTabScreenProps } from '../../types';
import { Text, View } from '../../customComponents/Themed';
import { SimpleRow, Separator } from "../../components/Row";
import useNetworkReducer from "../../network/reducers/useNetworkReducer";
import { postUser, getTestUser, voidUser } from '../../network/services/service';
import { NetworkState } from '../../network/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import {PostSP} from '../../network/models/RequestSP';
import { Item, styles } from './TabOneScreen'
import { useSelector} from 'react-redux';
import {useAppDispatch, useAppSelector} from '../../store/toolkit/index'


const TabSettings = ({ navigation }: RootTabScreenProps<'TabSettings'>) => {

const [testdata, setTestData] = React.useState<[PostRP][]>();

// Calling Network Reducer
// Takes INput Model and Output Model and returns dispatch, success and error case and data.

const [users, call, reset] = useNetworkReducer<PostSP, [PostRP]>(postUser,
  (data, dataArray) =>{

  /**
   * Update the store with the received data.
   */
 console.log("testdata",users.dataArray);

},
(error) => {
  console.log("Data: Error", error.kind, error.message, error.errors);
});

const getItem = () => ({
  id: 0,
  title: ""
});

const getItemCount = () => !users.dataArray?.length ? 0: users.dataArray?.length ;
const articleState = useAppSelector(state => state);


 React.useEffect(() => {
  
  console.log("A State",articleState);
   call( {
    userId: 1,
    title: "tewst",
    body: "dddd"
   });
  // call();
 }, [users, articleState]);


 return (
     

  <View style = {styles.container}>
 <SafeAreaView>

    <VirtualizedList

    data={users.dataArray?.map(item => item)}

    initialNumToRender={4}
    renderItem={
      ({ item }) => 
    {
      const name = `${item.id} ${item.title}`;

      let title = item.id
      let subTitle = item.title

      return (
        <Item 
          id={0}
          title={ "twins dfghjkl hfcgvjbkjnl hgjhbkjnlmk"}
        />
      );
    }
}
    keyExtractor={(item: PostRP) => {
        return `${item.id}-${item.title}`;
    }}

    getItem={ getItem}

    getItemCount={getItemCount}
    />  

  {/* <FlatList
    data={users.dataArray?.values}
    // renderItem={({ item }: ListRenderItemInfo<PostRP>) => (
    //     <PostRP item={item} />
    //   )}
    // keyExtractor={(item: ItemType) => item.id}
    keyExtractor={(item: PostRP) => {
      return `${item.id}-${item.title}`;
    }}
    renderItem={({ item }) => {

      let title = item.title
      let subTitle = item.body

      return (
        <SimpleRow
          title= { !title ? title : "xaian " } 
          subtitle= { !subTitle ? subTitle : "kei pani" }
        />
      );
    }}
    ItemSeparatorComponent={Separator}
    ListHeaderComponent={() => <Separator />}
    ListFooterComponent={() => <Separator />}
    contentContainerStyle={{ paddingVertical: 20 }}
  />   */}

  </SafeAreaView>
  </View>
 );
}

export default TabSettings;
