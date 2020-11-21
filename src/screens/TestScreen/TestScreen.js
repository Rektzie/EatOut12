import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from '../styles';

import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase'



export default function TestScreen(){
const [uid, setUid] = useState('')
    useEffect( () => {
        console.log('hihi')

        const auth = firebase.auth()
        setUid(auth.currentUser.uid)
    },[])

    return (
        <View>
            <Text>
                {uid}
            </Text>
        </View>
    )
}