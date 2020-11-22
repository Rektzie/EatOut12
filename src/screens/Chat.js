import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, Text, View, Button, Easing, Image, StatusBar, FlatList, SafeAreaView } from "react-native";
import firebase from 'firebase'

const Chat = () => {


  ////////////////////

  const [posts, setPosts] = useState([]);
  const db = firebase.firestore().collection('users');
  

  

  useEffect(() => {
    const unsubscribe = db.onSnapshot((snapshot) => {
        let postData = [];
        snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
        // console.log({postData})
        setPosts(postData)
      })
    return () => { unsubscribe() }
  }, [])

  // const getPosts = () => {
  // getPosts();


  // useEffect(() => {

  // }, []);



  // const Item = ({ fullName }) => (
  //   <View style={styles.item}>
  //     <Text  style={styles.title}>{fullName}</Text>
  //   </View>
  // );

  // const renderItem = ({ item }) => (
  //   <Item title={item.fullName} />
  // );
  const DATA = [
    {
      fullName: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      id: 'First Item',
    },
    {
      fullName: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      id: 'Second Item',
    },
    {
      fullName: '58694a0f-3da1-471f-bd96-145571e29d72',
      id: 'Third Item',
    },
  ];

  console.log(DATA)
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );


  const renderItem = ({ item }) => {
    console.log(item.fullName)
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.fullName}</Text>
      </View>)

  }

  // <Item title={item.fullName} />





  return (
    <View style={styles.layout}>
      <SafeAreaView style={styles.container}>
        {/* <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.fullName}
        /> */}
        {
          posts.map(user => {
            console.log(user.fullName)
            return (
              <View style={styles.item}>
                <Text style={styles.title}>{user.fullName}</Text>
              </View>
            )
          })
        }
      </SafeAreaView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 40,
    marginTop: 10
    // padding: 50,
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: '#000000'
  },
});


export default Chat;
