import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View, Button, Easing, Image, Keyboard, TouchableWithoutFeedback } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'; 
import firebase from 'firebase'

const ChatRoom = (props) => {
  return (
    <View style={styles.containercolor}>
          <View style={styles.containerimage}>
          <LinearGradient colors={['#ae1e1e', '#ff005f', '#ffcc00']}  
        stops={[0, 35, 100]}
        style={styles.imagecolor} >
          <Image style={styles.imageprofile}

            source={{
              uri: props.avatar,
            }}
          />
          </LinearGradient>
          <Text style={styles.titlename}>{props.name}</Text>

          </View>
        <View style={styles.containertext} onPress={() => props.navigation.navigate("Chat")}>
        <Text style={styles.text} onPress={() => props.navigation.navigate("Chat")}>{props.msg}</Text>
        <AntDesign name="right" size={24} color="black" style={styles.icon} onPress={() => props.navigation.navigate("Chat", {roomname: props.roomname})}/>
        </View>
        <View style={styles.line} />
      </View>
  )
}

const Homechat = (props) => {
  const [rooms, setRooms] = useState({})
  const [users, setUsers] = useState({})

  useEffect(() => {
    const user = firebase.auth().currentUser
    const database = firebase.database()
    const ref = database.ref()
    ref.on('value', async (snapshot) =>{
      const data = snapshot.val();
      const rooms = {}
      const userstmp = {...users}
      const filterRoomName = Object.keys(data).filter(room => {
        const usersInRoom = room.split('_')
        const isUserRelated = usersInRoom.includes(user.uid)
        return isUserRelated
      })

      for (const name of filterRoomName) {
        const usersInRoom = name.split('_')
        for (const u of usersInRoom) {
          if (!userstmp[u]) {
            // หาดาต้าเบสจ้า
            const db = firebase.firestore()
            console.log({u})
            const userRef = db.collection('users').doc(u)
            const userDoc = await userRef.get()

            userstmp[u] = {
              name: userDoc.data().fullName,
              image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Beauty_girl.jpg/499px-Beauty_girl.jpg'
            }
          }
        }
        rooms[name] = data[name][Object.keys(data[name])[0]]
      }
      console.log(userstmp)
      console.log(rooms)
      setUsers(userstmp)
      setRooms(rooms)
    });
    
  }, [])
  const user = firebase.auth().currentUser
 
  return (
    <ScrollView style={styles.layout}>
        
        {
          Object.keys(rooms).map(roomname => {
            const chatmates = roomname.split('_')
            chatmates.slice(chatmates.indexOf(user.uid), 1)[0]
            const chatterid = chatmates[0]
            console.log({ chatterid })
            return <ChatRoom
              key={chatterid}
              navigation={props.navigation}
              avatar={users[chatterid].image}
              name={users[chatterid].name}
              msg={rooms[roomname].text}
              roomname={roomname}
              />
          })
        }
      
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  containerimage: {
    flex: 1,
    flexDirection:"row"
  },
  layout:{

    flex: 1,

  },
  containercolor:{

    
  },
  containertext:{
    flexDirection:"row",
    marginLeft:90,
    marginBottom:20,
    justifyContent:"space-between"
},
  titlename: {
    marginLeft: 20,
    marginTop: 15,
    fontWeight: "bold",
    color: "#707070",
    fontSize: 18,
    fontFamily: 'Athiti'
  },
  text: {
    marginLeft: 20,
    fontWeight: "bold",
    color: "#707070",
    fontSize: 18,
    fontFamily: 'Athiti'
  },
 
  imagecolor: {
    borderRadius:28,
    overflow:'hidden',
    height:55,
    width:55,
    justifyContent:'center',
    alignItems:"center",
    marginLeft:20,
    marginTop:10
  },
  imageprofile: {
    width: 40,
    height: 40,
    borderRadius: 50,
    overflow: "hidden",
    borderColor: "black",
    borderWidth: 2,
    
    
  },
  icon:{
      marginRight:50,
  },
  line: {

    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },

});

export default Homechat;
