import React from "react";
import { FlatList } from "react-native";
import { ContactListRow, Separator } from "../../components/Row";
import users from "../../data/user";
import { ContactScreenProps } from '../../types';

export default ({ navigation }: ContactScreenProps<'ContactList'>) => (
  <FlatList
    data={users}
    keyExtractor={(item) => {
      return `${item.id.value}-${item.phone}`;
    }}
    renderItem={({ item }) => {
      const name = `${item.name.first} ${item.name.last}`;

      return (
        <ContactListRow
          image={{ uri: item.picture.thumbnail }}
          title={name}
          subtitle={item.email}
          onPress={() => navigation.push("ContactDetailScreen", { contact: item })}
// navigation.navigate("ContactDetailScreen")

        />
      );
    }}
    ItemSeparatorComponent={Separator}
    ListHeaderComponent={() => <Separator />}
    ListFooterComponent={() => <Separator />}
    contentContainerStyle={{ paddingVertical: 20 }}
  />
);