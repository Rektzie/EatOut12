import React, { useRef, useState, useEffect } from "react";
import { Animated, StyleSheet, Text, View, Button, Easing, Image } from "react-native";
import firebase from 'firebase'

const Post = () => {

  const [uid, setUid] = useState('')
    useEffect( () => {
        console.log('hihi')

        const auth = firebase.auth()
        setUid(auth.currentUser.uid)
    },[])
 
  return (
    <View style={styles.layout}>
      {uid}
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  botton: {
    justifyContent: "flex-end",
  },
  layout:{
    flexDirection: "row",
    flex: 1
  },
  img:{
    width: 100,
    height: 100
  }
 
});

export default Post;
