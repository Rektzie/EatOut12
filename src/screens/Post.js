import React, { useRef, useState, useEffect} from "react";
import { Animated, StyleSheet, Text, View, Button, Easing, Image } from "react-native";
import Newsfeed from "../components/newsfeed";
import firebase from 'firebase';

const Post = (props) => {

  const [uid, setUid] = useState('')
    useEffect( () => {
        const auth = firebase.auth()
        setUid(auth.currentUser.uid)
    },[])
 
  return (
    < Newsfeed navigation={props.navigation} / >
     
   
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
