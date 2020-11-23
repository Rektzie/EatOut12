import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View, Image, Button, TouchableOpacityBase } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';
import firebase from 'firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const onSignOutButtonPressed = () => {
  // firebase.auth().signOut().then(function () {
  // Sign-out successful.
  firebase.auth()
      .signOut()
      .then(() => console.log('User signed out!'));
}

const ProfileScreen = (props) => {
  const [userData, setUserData] = useState({

    email: "",
    fullName: "",
    age: "",
    BMI: "",
    weight: "",
    height: "",

  })
  const auth = firebase.auth()
  const [uid, setUid] = useState(auth.currentUser.uid)
  useEffect(() => {
    const dbRef = firebase.firestore().collection('users').doc(uid)
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        setUserData(
          {

            email: user.email,
            fullName: user.fullName,
            age: user.age,
            BMI: user.BMI,
            weight: user.weight,
            height: user.height,


          }


        )
      } else {
        console.log("Document does not exist!");
      }
    });
  }, [])
  // }

  // const updateDBRef = firebase.firestore().collection('users').doc(uid);
  // updateDBRef.set({
  //   height: 157,
  // })


  return (

    <View style={{ flex: 1 }}>
       <LinearGradient colors={['#ffd555', '#fcd190', '#f9ea96']}  
        stops={[0, 48                                                         , 100]}
        style={styles.bgcolor} >
      {/* <View style={{flex: 1.6,backgroundColor:"#F9F1CE"}}> */}
      <View style={styles.containerprofileimageandedit}>

        {/* <Text>{height}</Text> */}



        <LinearGradient colors={['#ae1e1e', '#ff005f', '#ffcc00']}  
        stops={[0, 35, 100]}
        style={styles.imagecolor} >
          <Image style={styles.imageprofile}

            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Beauty_girl.jpg/499px-Beauty_girl.jpg',
            }}
          />
          </LinearGradient>
        <View style={{ flexDirection: "row", marginTop:10 }}>
          <TouchableOpacity style={{flexDirection:"row",width:135, height:35, backgroundColor:"#006FFF", color:"white", justifyContent:"center", alignItems:"center", borderRadius:20}} onPress={() => props.navigation.navigate("EditProfile")}>
          <MaterialIcons name="edit" size={25} color="white" style={{marginRight:3}}/>
            <Text style={{color:"white", fontSize:16, fontWeight:"bold"}}>Edit Profile</Text>
            </TouchableOpacity>
          {/* <Text style={styles.texteidtprofile}>Edit Profile</Text> */}

        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
        <MaterialCommunityIcons name="rename-box" size={24} color="gray" style={{marginLeft:15, lineHeight:33}}/>
          <Text style={styles.nameandemail}>Name</Text>
          <TextInput  editable={false} selectTextOnFocus={false} onEndEditing={false}  paddingLeft={20} style={styles.inputnameandemail}>
            <Text style={{color:'gray'}}>{userData.fullName}</Text></TextInput>
        </View>

        <View style={{ flexDirection: "row", marginTop: 15 }}>
        <MaterialCommunityIcons name="email" size={24} color="gray" style={{marginLeft:15, lineHeight:33}}/>
          <Text style={styles.nameandemail}>Email</Text>
          <TextInput  editable={false} selectTextOnFocus={false} onEndEditing={false}  paddingLeft={20} style={styles.inputnameandemail}>
          <Text style={{color:'gray'}}>{userData.email}</Text></TextInput>

        </View>

        {/* <View style={styles.line} />


        <View style={{ flexDirection: "row" }}>
          <Text style={styles.age}>Age</Text>
          <Text paddingLeft={20} style={styles.age}>{userData.age}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.bmi}>BMI</Text>
            <Text paddingLeft={20} style={styles.age}>{userData.BMI}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.weight}>Weight</Text>
          <Text paddingLeft={20} style={styles.weight}>{userData.weight}</Text>

          <Text style={styles.height}>Height</Text>
          <Text paddingLeft={20} style={styles.height}>{userData.height}</Text>
        </View> */}
        </View>
        {/* <View style={styles.line} /> */}

        {/* <View style={{ flexDirection: "row" }}>
          <Text style={styles.goal}>Goal Reached Streak</Text>
          <Text editable={false} selectTextOnFocus={false} onEndEditing={false} paddingLeft={20} style={styles.inputgoal}><Text>5สมมติเลข</Text></Text>
        </View> */}
      {/* </View> */}
      </LinearGradient>

      <View style={{ flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1, marginTop: 20 }}>
          
          <TouchableOpacity onPress={onSignOutButtonPressed} style={styles.logoutbutton}>
            <Text style={styles.textlogout}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

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
    lineHeight:25
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
    marginTop: 23,
    marginLeft: 20,
    fontWeight: "bold",
    color: "#707070",
    fontSize: 18,
    // fontFamily: 'Athiti'
  },
  inputage: {
    marginTop: 20,
    marginLeft: 32,
    width: "25%",
    height: 30,
    borderWidth: 0.5,
    borderColor: "#3186FF",
    borderRadius: 20
  },
  bmi: {
    marginLeft: 20,
    marginRight: 15,
    marginTop: 23,
    fontWeight: "bold",
    color: "#707070",
    fontSize: 18,
    // fontFamily: 'Athiti'
  },
  inputbmi: {
    marginLeft: 20,
    marginTop: 20,
    width: "42%",
    height: 30,
    borderWidth: 0.5,
    borderColor: "#3186FF",
    borderRadius: 20
  },
  weight: {
    marginTop: 23,
    marginLeft: 20,
    fontWeight: "bold",
    color: "#707070",
    fontSize: 18,
    // fontFamily: 'Athiti'
  },
  inputweight: {
    marginTop: 20,
    marginLeft: 8,
    width: "25%",
    height: 30,
    borderWidth: 0.5,
    borderColor: "#3186FF",
    borderRadius: 20
  },
  height: {
    marginLeft: 18,
    marginRight: 15,
    marginTop: 23,
    fontWeight: "bold",
    color: "#707070",
    fontSize: 18,
    // fontFamily: 'Athiti'
  },
  inputheight: {
    marginTop: 20,
    width: "25%",
    height: 30,
    borderWidth: 0.5,
    borderColor: "#3186FF",
    borderRadius: 20
  },
  bgcolor: {
    height:'60%',
    overflow:'hidden',
    justifyContent:'center',
    alignItems:"center",
  },
  imagecolor: {
    borderRadius:69,
    overflow:'hidden',
    height:135,
    width:135,
    justifyContent:'center',
    alignItems:"center",
    marginTop:10
  },
  imageprofile: {
    justifyContent:'center',
    alignItems:"center",
    width: 110,
    height: 110,
    borderRadius: 50,
    overflow: "hidden",
    borderColor: "black",
    borderWidth: 3,
    
    
  },
  // goal: {
  //   marginTop: 23,
  //   marginLeft: 20,
  //   fontWeight: "bold",
  //   color: "#707070",
  //   fontSize: 18,
    // fontFamily: 'Athiti'
  // },
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
    justifyContent: "center",
    alignItems: "center",
    flex: 2
    
  }


});

export default ProfileScreen;
