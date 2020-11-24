import React, { useRef } from "react";
import { Animated, StyleSheet, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import {createAppContainer} from 'react-navigation';
import {createStackNavigation} from 'react-navigation-stack';
import {GiftedChat} from 'react-native-gifted-chat';
import Fire from "../../Fire";
import firebase from 'firebase'
import { SafeAreaView } from "react-native-safe-area-context";
export default class Chat extends React.Component  {
  state = {
    message : []
  }

  get user(){
    return {
      _id: Fire.uid,
      // name: Fire.uid
    }
  }



  componentDidMount(){
    const user = firebase.auth().currentUser
    const roomname = this.props.route.params.roomname
    Fire.setDB = roomname
    Fire.get(message => this.setState(previous => ({
      message: GiftedChat.append(previous.message,  message)
    })))
  }

  componentWillUnmount(){
    Fire.off();
  }

  render(){
    const chat = <GiftedChat messages={this.state.message} onSend={Fire.send} user={this.user} />;
    if(Platform.OS === "android"){
      return (
        <TouchableWithoutFeedback onPress={()=>{
          Keyboard.dismiss();
      }}>
      <KeyboardAvoidingView style={{flex:1}} behavior="padding" keyboardVerticalOffset={30} enabled>
      {chat}
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      );
    }
  
    return  <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
  }}>
    <SafeAreaView style={{flex:1}}>{chat}</SafeAreaView>
    </TouchableWithoutFeedback>

  }

};


