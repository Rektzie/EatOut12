import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View, Easing, Image, ImageBackground, Button } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase';


const Newsfeed = () => {

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

  const getDailyObject = () => {
    const firebaseRef = firebase.firestore()
    const post_list_ref = firebaseRef.collection('post_lists')

    // const posted = dailyRef.get()
    post_list_ref.onSnapshot((documentSnapshot) => {
      // 
      // console.log(dailyObject)
      // console.log(dailyObject.posted)
      let objData = [];
      documentSnapshot.forEach((doc) => objData.push({ ...doc.data(), id: doc.id }));
      // console.log({postData})
      setPostList(objData)


    });
  }


  useEffect(() => {
    // const didMount = async () => {

    //   await getDailyObject()
    // }

    // didMount()
    const db = firebase.firestore().collection('post_lists')
    const unsubscribe = db.onSnapshot((snapshot) => {
      let postData = [];
      snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));

      setPostList(postData)
    })
    return () => { unsubscribe() }
  })


  const renderItem = ({ item }) => {

    // var imgBreakfast
    // var imgLunch
    // var imgDinner
    const user = firebase.firestore().collection('users').doc(item.id).get()
    

    // const setVar = async () => {
    //   let photoPath1 = item.breakfast_image
    //   // let imageRef1 = firebase.storage().ref(photoPath1);
    //   let photoPath2 = item.lunch_image
    //   // let imageRef2 = firebase.storage().ref(photoPath2);
    //   let photoPath3 = item.dinner_image
    //   // let imageRef3 = firebase.storage().ref(photoPath3);


    //   imgBreakfast = await firebase.storage().ref(photoPath1).getDownloadURL();
    //   imgLunch = await firebase.storage().ref(photoPath2).getDownloadURL();
    //   imgDinner = await firebase.storage().ref(photoPath3).getDownloadURL();


      // imageRef1
      //   .getDownloadURL()
      //   .then((url) => {
      //     //from url you can fetched the uploaded image easily
      //     imgBreakfast = url
      //   })
      //   // .catch((e) => console.log('getting downloadURL of image error => ', e));

      // imageRef2
      //   .getDownloadURL()
      //   .then((url) => {
      //     //from url you can fetched the uploaded image easily
      //     imgLunch = url
      //   })
      //   // .catch((e) => console.log('getting downloadURL of image error => ', e));

      // imageRef3
      //   .getDownloadURL()
      //   .then((url) => {
      //     //from url you can fetched the uploaded image easily
      //     imgDinner = url
      //   })
      // .catch((e) => console.log('getting downloadURL of image error => ', e));

    // }

    // setVar()







    return (
      <View style={styles.header}>
        <View style={{ backgroundColor: "#9100FF" }}>
          <View style={styles.header}>
<Text>{user.imageprofile}</Text>
            <LinearGradient colors={['#ae1e1e', '#ff005f', '#ffcc00']}
              stops={[0, 35, 100]}
              style={styles.imagecolor} >
              <Image style={styles.imageprofile}

                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Beauty_girl.jpg/499px-Beauty_girl.jpg',
                }}
              />
            </LinearGradient>
            {/* <Button
            title="test"
            onPress={() => Test()}
          >
          </Button> */}
            <Text style={styles.headertextname}>
              Ploy.sucha
        </Text>
            <View style={{ flexDirection: "row", marginLeft: 15 }}>
              <AntDesign name="wechat" size={40} color="#B0CDF6" />
            </View>

          </View>
        </View>
        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row", margin: 10 }}>
            <Text style={styles.headershared}>Ploy.sucha Shared Total Ate 1020 Kcal</Text>
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
            <TextInput style={styles.inputkcal}>
              <Text style={styles.textkcal}>{item.breakfast_cal}</Text>
            </TextInput>
            <TextInput style={styles.inputkcal}>
              <Text style={styles.textkcal}>{item.lunch_cal}</Text>
            </TextInput>
            <TextInput style={styles.inputkcal}>
              <Text style={styles.textkcal}>{item.dinner_cal}</Text>
            </TextInput>
          </View>


        </View>

        <View style={styles.line} />
      </View>
    )

  }




  return (
    <ScrollView>
      <FlatList
        data={postList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />



    </ScrollView>


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
