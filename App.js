import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {ListItem, SearchBar, Header} from "react-native-elements";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import axios from "axios";
import MessageError from "./application/components/MessageError";
 
const URL = "http://157.245.138.232:9091/api/v1/test/superheroes";
 
export default function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(URL);
        const result = response.data.data;
        setData(result.filter((e) => e.puedeVolar === true));
        setLoading(false);
      } catch (error) {
        setError(JSON.stringify(error));
      }
    }
    fetchData();
  }, [setLoading, setData]);
 
  const searchBar = (
    <SearchBar
        platform="ios"
        showLoading
        cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
        placeholder='Busca algún superhéroe' 
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
  );

  const header = (
    <Header
      backgroundColor= '#FD5430'
      leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{ text: 'SUPERHÉROES', style: { color: '#fff' } }}
      rightComponent={{ icon: 'home', color: '#fff' }}
    />
  );


  
  const renderItem = ({ item }) => {
    return (
			<ListItem
				containerStyle={styles.item}
				titleStyle={styles.title}
				title={item.nombre}
        leftAvatar={{ source: { uri: item.avatarURL } }}
        bottomDivider
			/>
    );
  };
 
  const renderContent = () => {
    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    );
  };
 
  if (error) {
    return <MessageError text='NO HAY SUPERHEROES'/>;
  }


  return (
    <View>
      {header}
      {searchBar}
      {loading ? <ActivityIndicator /> : renderContent()}
      <StatusBar style="auto" />
    </View>
  );
}
 
const styles = StyleSheet.create({
  title: {
    color: '#fff',
  },
  listIconStyle: {
    marginRight: 10,
    fontSize: 15,
    color: 'rgba(255, 38, 74, 0.6)'
  },
  item: {
    padding: 20,
    backgroundColor: 'rgba(206, 206, 206, 0.6)'
  }
});
 