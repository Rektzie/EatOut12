import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View, Easing, Image, ImageBackground, Button, Alert } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase';


const Newsfeed = (props) => {

  // const [snap, setSnap] = useState()

  // const Test = async () => {
  //   // const dbRef = firebase.firestore().collection('users')
  //   // dbRef
  //   //   .get()
  //   //   .then(snapshot => {
  //   //     snapshot
  //   //       .docs
  //   //       .forEach(doc => {


  //   //         <Text>{JSON.parse(doc._document.fullName.toString())}</Text>
  //   //       });
  //   //   });





  // }

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1; //To get the Current Month
  var year = new Date().getFullYear(); //To get the Current Year
  const [today, setToday] = useState(date + '-' + month + '-' + year)
  const userID = firebase.auth().currentUser.uid
  const [postList, setPostList] = useState([])
  const [users, setUsers] = useState({})

  // const getDailyObject = () => {
  //   const firebaseRef = firebase.firestore()
  //   const post_list_ref = firebaseRef.collection('post_lists')

  //   // const posted = dailyRef.get()
  //   post_list_ref.onSnapshot((documentSnapshot) => {
  //     // 
  //     // console.log(dailyObject)
  //     // console.log(dailyObject.posted)
  //     let objData = [];
  //     const users = {}
  //     documentSnapshot.forEach(async(doc) => {
  //       objData.push({ ...doc.data(), id: doc.id })
  //       users[doc.data().owner] = {}
  //       const userRef = firebaseRef.collection('users').doc(doc.data().owner)
  //       const userDocs = await userRef.get()
  //       users[doc.data().owner] = userDocs.data()
  //     });
  //     // console.log({postData})
  //     setUsers(prev => ({...users}))
  //     setPostList(prev => ({...objData}))

      
  //   });
  // }


  useEffect(() => {
    // const didMount = async () => {

    //   await getDailyObject()
    // }

    // didMount()
    const db = firebase.firestore().collection('post_lists')
    const users = {...users}
    const unsubscribe = db.onSnapshot(async (documentSnapshot) => {
      let postData = [];
      for (const doc of documentSnapshot.docs) {
        postData.push({ ...doc.data(), id: doc.id })
        if (!users[doc.data().owner]) {
          // get user data if it is not in users
          // console.log(doc.data().owner)
          const userRef = firebase.firestore().collection('users').doc(doc.data().owner)
          const userDocs = await userRef.get()
          users[doc.data().owner] = userDocs.data()
        }
      }
      // console.log({postData})
      setUsers(prev => ({...users}))
      setPostList(prev => ([...postData]))
    })
    return () => { unsubscribe && unsubscribe() }
  }, [users, postList])


  const renderItem = ({ item }) => {

    return (
      <ScrollView>
      <View style={{ backgroundColor: "#9100FF" }}>
        <View style={styles.header}>
        <LinearGradient colors={['#ae1e1e', '#ff005f', '#ffcc00']}  
        stops={[0, 35, 100]}
        style={styles.imagecolor} >
          <Image style={styles.imageprofile}

            source={users[item.owner] && users[item.owner].imageprofile  ? {uri: users[item.owner].imageprofile} : require('../../assets/profile.png')}
          />
          </LinearGradient>
          <Text style={styles.headertextname}>
            {users[item.owner].fullName}
        </Text>
          <TouchableOpacity onPress={() => {
            const user = firebase.auth().currentUser
            const room_user = [user.uid, item.owner].sort().join('_')
            Alert.alert("Go to Chat with " + users[item.owner].fullName, "Do you want to enter chat room ?", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Yes", onPress: () => props.navigation.navigate('Chat', {roomname: room_user}) }
            ],
            { cancelable: false }
          )
          }} style={{ flexDirection: "row", marginLeft: 15 }}>
            <AntDesign name="wechat" size={40} color="#B0CDF6" />
          </TouchableOpacity>
        
        </View>
      </View>

{/* 


        <View style={{ backgroundColor: "#9100FF" }}>
          <View style={styles.header}>
            <Text>{user.imageprofile}</Text>
            <LinearGradient colors={['#ae1e1e', '#ff005f', '#ffcc00']}
              stops={[0, 35, 100]}
              style={styles.imagecolor} >
              <Image style={styles.imageprofile}

                source={
                  { uri: item.imageprofile }
                }
              />
            </LinearGradient>

          </View>
            <Text style={styles.headertextname}>
            Ploy.sucha
        </Text>
            <View style={{ flexDirection: "row", marginLeft: 15 }}>
              <AntDesign name="wechat" size={40} color="#B0CDF6" />
            </View>

          </View> */}
        
        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row", margin: 10 }}>
          <Text style={styles.headershared}>{users[item.owner].fullName} Shared Ate</Text>
          </View>
          <View style={styles.containerate}>
            <Text style={styles.breakfast}>Breakfast</Text>
            <Text style={styles.lunch}>Lunch</Text>
            <Text style={styles.dinner}>Dinner</Text>
          </View>
          <View style={styles.containerimageate}>
            <Image style={{ width: 120, height: 90, }}

              source={{
                uri: item.breakfast_image,
              }} />
            <Image style={{ width: 120, height: 90, }}

              source={{
                uri: item.lunch_image,
              }} />
            <Image style={{ width: 120, height: 90, }}

              source={{
                uri: item.dinner_image,
              }} />

          </View>

          <View style={styles.containerkcal}>
            <TextInput editable={false} selectTextOnFocus={false} style={styles.inputkcal}>
              <Text style={styles.textkcal}>{item.breakfast_cal} Kcal</Text>
            </TextInput>
            <TextInput editable={false} selectTextOnFocus={false} style={styles.inputkcal}>
              <Text style={styles.textkcal}>{item.lunch_cal} Kcal</Text>
            </TextInput>
            <TextInput editable={false} selectTextOnFocus={false} style={styles.inputkcal}>
              <Text style={styles.textkcal}>{item.dinner_cal} Kcal</Text>
            </TextInput>
          </View>


        </View>

        <View style={styles.line} />

      </ScrollView>
    )

  }


  // console.log({ users })

  return (

      <FlatList
        data={postList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />




  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    justifyContent: "flex-start",
    flex: 1,
    flexDirection: "row",
    margin: 10,
    backgroundColor: "#9100FF"
  },
  imagecolor: {
    borderRadius: 35,
    overflow: 'hidden',
    height: 68,
    width: 68,
    justifyContent: 'center',
    alignItems: "center"
  },
  imageprofile: {
    width: 60,
    height: 60,
    borderRadius: 50,
    overflow: "hidden",
    borderColor: "black",
    borderWidth: 2
  },
  headertextname: {
    marginLeft: 15,
    marginTop: 5,
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
    // fontFamily: 'Athiti'
  },
  headershared: {
    marginTop: 5,
    fontWeight: "bold",
    color: "#707070",
    fontSize: 16,
    // fontFamily: 'Athiti'
  },
  breakfast: {
    marginRight: 20,
    marginTop: 5,
    fontWeight: "bold",
    color: "#D7385E",
    fontSize: 16,
    // fontFamily: 'Athiti'
  },
  lunch: {
    marginRight: 25,
    marginLeft: 10,
    marginTop: 5,
    fontWeight: "bold",
    color: "#D7385E",
    fontSize: 16,
    // fontFamily: 'Athiti'
  },
  dinner: {
    marginLeft: 10,
    marginRight: 20,
    marginTop: 5,
    fontWeight: "bold",
    color: "#D7385E",
    fontSize: 16,
    // fontFamily: 'Athiti'
  },
  inputkcal: {
    width: "23%",
    height: 30,
    borderWidth: 0.5,
    borderColor: "#3186FF",
    borderRadius: 20
  },
  textkcal: {
    fontWeight: "bold",
    color: "gray",
    fontSize: 16,
    // fontFamily: 'Athiti',
    textAlign: "center"
  },
  line: {
    marginTop: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  containerimageate: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-around',
    margin: 2
  },
  containerate: {
    flexDirection: "row",
    flex: 1,
    justifyContent: 'space-around',
    marginHorizontal: 5,
    alignItems: "center"
  },
  containerkcal: {
    flexDirection: "row",
    flex: 1,
    justifyContent: 'space-around'
  }

});

export default Newsfeed;
