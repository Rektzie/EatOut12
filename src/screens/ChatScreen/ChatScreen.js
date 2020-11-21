import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from '../styles';
import { firebase } from '../../firebase/config'
import { useNavigation } from '@react-navigation/native';



const ChatScreen = ({navigaion}) => {
    const onSignOutButtonPressed = () => {
        // firebase.auth().signOut().then(function () {
        // Sign-out successful.
        firebase.auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    return(
        <View>
            <Text>
                ChatScreen
                
            </Text>
            <TouchableOpacity onPress={onSignOutButtonPressed} ><Text>Logout</Text></TouchableOpacity>
            
        </View>
    )

}

export default ChatScreen;