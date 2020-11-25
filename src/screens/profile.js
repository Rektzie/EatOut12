import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View, Image, Button, TouchableOpacityBase } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';
import firebase from 'firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const onSignOutButtonPressed = () => {
  // firebase.auth().signOut().then(function () 
  // Sign-out successful.
  firebase.auth()
    .signOut()
    .then(() => console.log('User signed out!'));
}

const ProfileScreen = (props) => {
  const [userData, setUserData] = useState({})
  const auth = firebase.auth()
  const [uid, setUid] = useState(auth.currentUser.uid)

  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  // const [userData, setUserData] = React.useState(null)
  // when the id attribute changes (including mount)
  // subscribe to the recipe document and update
  // our state when it changes.

  useEffect(() => {
    const auth = firebase.auth()
    const unsub = auth.onAuthStateChanged(user => {
      if (!user) props.navigation.replace('Login')
    })
    
    const subscriber = firebase.firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        setUserData(prev => ({...documentSnapshot.data()}));
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [uid]);

  // useEffect(() => {
  //   const didMount = async () => {
  //     const unsubscribe = firebase.firestore().collection('users').doc(uid)
  //       .onSnapshot(doc => {
  //         setLoading(false)
  //         setUserData(doc)
  //         console.log(doc)
  //       }, err => { setError(err) })
  //     // returning the unsubscribe function will ensure that
  //     // we unsubscribe from document changes when our id
  //     // changes to a different value.
  //     return () => unsubscribe()
  //   }
  //   didMount()
  // }, [])

  // return {
  //   error,
  //   loading,
  //   userData,
  // }

  // useEffect(() => {
  //   const dbRef = firebase.firestore().collection('users').doc(uid)
  //   dbRef.get().then((res) => {
  //     if (res.exists) {
  //       const user = res.data();
  //       setUserData(
  //         {

  //           email: user.email,
  //           fullName: user.fullName,
  //           age: user.age,
  //           BMI: user.BMI,
  //           weight: user.weight,
  //           height: user.height,


  //         }


  //       )
  //     } else {
  //       console.log("Document does not exist!");
  //     }
  //   });
  // }, [])
  // }

  return (

  
      <LinearGradient colors={['#ffd555', '#fcd190', '#f9ea96']}
        stops={[0, 48, 100]}
        style={styles.bgcolor} >
  <ScrollView>
        <View style={styles.containerprofileimageandedit}>




          <LinearGradient colors={['#ae1e1e', '#ff005f', '#ffcc00']}
            stops={[0, 35, 100]}
            style={styles.imagecolor} >
            <Image style={styles.imageprofile}

              source={
                userData.imageprofile ?
                { uri: userData.imageprofile} : require('../../assets/profile.png') 
              }
            />
          </LinearGradient>
          <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 20 }}>
            <TouchableOpacity style={{ flexDirection: "row", width: 135, height: 35, backgroundColor: "#006FFF", color: "white", justifyContent: "center", alignItems: "center", borderRadius: 20 }} onPress={() => props.navigation.navigate("EditProfile")}>
              <MaterialIcons name="edit" size={25} color="white" style={{ marginRight: 3 }} />
              <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Edit Profile</Text>
            </TouchableOpacity>
            {/* <Text style={styles.texteidtprofile}>Edit Profile</Text> */}

          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <MaterialCommunityIcons name="rename-box" size={24} color="gray" style={{ marginLeft: 15, lineHeight: 33 }} />
            <Text style={styles.nameandemail}>Name</Text>
            <TextInput editable={false} selectTextOnFocus={false} paddingLeft={20} style={styles.inputnameandemail}>
              <Text style={{ color: 'gray' }}>{userData.fullName}</Text></TextInput>
          </View>

          <View style={{ flexDirection: "row", marginTop: 15, justifyContent: "center" }}>
            <MaterialCommunityIcons name="email" size={24} color="gray" style={{ marginLeft: 15, lineHeight: 33 }} />
            <Text style={styles.nameandemail}>Email</Text>
            <TextInput editable={false} selectTextOnFocus={false} paddingLeft={20} style={styles.inputnameandemail}>
              <Text style={{ color: 'gray' }}>{userData.email}</Text></TextInput>

          </View>

          <View style={styles.line} />


          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <FontAwesome name="birthday-cake" size={24} color="gray" style={{ marginLeft: 55, lineHeight: 65 }} />
            <Text style={styles.age}>Age</Text>
            <TextInput editable={false} selectTextOnFocus={false} paddingLeft={20} style={styles.inputage}><Text style={{ color: 'gray' }}>{userData.age}</Text></TextInput>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <MaterialCommunityIcons name="google-fit" size={24} color="gray" style={{ marginLeft: 8, lineHeight: 65 }} />
            <Text style={styles.bmi}>BMI</Text>
            <TextInput editable={false} selectTextOnFocus={false} paddingLeft={20} style={styles.inputbmi}><Text style={{ color: 'gray' }}>{userData.BMI}</Text></TextInput>
            <Ionicons name="ios-body" size={24} color="gray" style={{ marginLeft: 10, lineHeight: 65 }} />
            <TextInput editable={false} selectTextOnFocus={false} paddingLeft={20} marginLeft={10} style={styles.inputcal}><Text style={{ color: 'gray' }}>
              {
                parseInt(userData.BMI) < 18.5 
                ? 'UnnderWeight' : parseInt(userData.BMI) >= 18.5 && parseInt(userData.BMI) < 25 
                  ? 'Normal' : parseInt(userData.BMI) >= 25 && parseInt(userData.BMI) < 30 
                  ? 'OverWeight' : parseInt(userData.BMI) >= 30 && parseInt(userData.BMI) < 35 
                  ? 'Obese' : parseInt(userData.BMI) >= 35 
                  ? 'ExtremylyObese' : 'error bmi' 
              }
              </Text></TextInput>
          </View>


          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <FontAwesome5 name="weight" size={24} color="gray" style={{ lineHeight: 65 }} />
            <Text style={styles.weight}>Weight</Text>
            <TextInput editable={false} selectTextOnFocus={false}  paddingLeft={20} style={styles.inputweight}><Text style={{ color: 'gray' }}>{userData.weight}</Text></TextInput>
            <MaterialCommunityIcons name="human-male-height" size={24} color="gray" style={{ marginLeft: 10, lineHeight: 65 }} />
            <Text style={styles.height}>Height</Text>
            <TextInput editable={false} selectTextOnFocus={false}  paddingLeft={20} style={styles.inputheight}><Text style={{ color: 'gray' }}>{userData.height}</Text></TextInput>
          </View>
        </View>


        <View style={{ flex: 1 }}>
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15 }}>

            <TouchableOpacity onPress={onSignOutButtonPressed} style={styles.logoutbutton}>
              <Text style={styles.textlogout}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </LinearGradient>
    

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  texteidtprofile: {
    marginRight: 20,
    marginTop: 5,
    fontWeight: "bold",
    color: "#707070",
    fontSize: 18,
    // fontFamily: 'Athiti'
  },
  nameandemail: {
    marginTop: 5,
    marginLeft: 10,
    fontWeight: "bold",
    color: "#707070",
    fontSize: 18,
    // fontFamily: 'Athiti',
    lineHeight: 25
  },
  inputnameandemail: {

    marginLeft: 20,
    width: "55%",
    height: 35,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 20
  },
  line: {
    marginTop: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,

  },
  age: {
    marginTop: 20,
    marginLeft: 11,
    fontWeight: "bold",
    color: "#707070",
    fontSize: 18,
    // fontFamily: 'Athiti'
  },
  inputage: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 45,
    width: "55%",
    height: 30,
    borderWidth: 0.5,
    borderColor: "#707070",
    borderRadius: 20
  },
  bmi: {

    marginRight: 15,
    marginLeft: 8,
    marginTop: 23,
    fontWeight: "bold",
    color: "#707070",
    fontSize: 18,
    // fontFamily: 'Athiti'
  },
  inputbmi: {

    marginTop: 20,
    width: "20%",
    height: 30,
    borderWidth: 0.5,
    borderColor: "#707070",
    borderRadius: 20
  },
  inputcal: {

    marginTop: 20,
    width: "28%",
    height: 30,
    borderWidth: 0.5,
    borderColor: "#707070",
    borderRadius: 20
  },
  weight: {
    marginTop: 23,
    marginLeft: 10,
    fontWeight: "bold",
    color: "#707070",
    fontSize: 18,
    // fontFamily: 'Athiti'
  },
  inputweight: {
    marginTop: 20,
    marginLeft: 8,
    width: "15%",
    height: 30,
    borderWidth: 0.5,
    borderColor: "#707070",
    borderRadius: 20
  },
  height: {
    marginLeft: 12,
    marginRight: 10,
    marginTop: 23,
    fontWeight: "bold",
    color: "#707070",
    fontSize: 18,
    // fontFamily: 'Athiti'
  },
  inputheight: {
    marginTop: 20,
    width: "15%",
    height: 30,
    borderWidth: 0.5,
    borderColor: "#707070",
    borderRadius: 20
  },
  bgcolor: {
    height: '100%',

    alignItems: "center",
  },
  imagecolor: {
    borderRadius: 69,
    overflow: 'hidden',
    height: 135,
    width: 135,
    justifyContent: 'center',
    alignItems: "center",

  },
  imageprofile: {
    justifyContent: 'center',
    alignItems: "center",
    width: 110,
    height: 110,
    borderRadius: 50,
    overflow: "hidden",
    borderColor: "black",
    borderWidth: 3,

  },
  inputgoal: {
    marginTop: 20,
    marginLeft: 32,
    width: "25%",
    height: 30,
    borderWidth: 0.5,
    borderColor: "#3186FF",
    borderRadius: 20
  },
  logoutbutton: {
    alignSelf: 'flex-end',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    width: 150,
    height: 50,
    backgroundColor: "#E83232"
  },
  textlogout: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
    // fontFamily: 'Athiti'
  },
  containerprofileimageandedit: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",


  }


});

export default ProfileScreen;
