import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config'
// import { useDispatch, useSelector } from 'react-redux'
// import {Login} from '../../store/action/user.action'



export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [listener, setListener] = useState(null)
    // const dispatch = useDispatch()
    // const selecttor = useSelector

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    useEffect(() => {
        const auth = firebase.auth()
        const unsub = auth.onAuthStateChanged(user => {
            if (user) navigation.reset({
              index: 0,
              routes: [{ name: 'Main' }],
            })
        })
        return () => {unsub && unsub()}
    }, [])
    
    

    const onLoginPress = () => {
        // const user = {
        //     email: email,
        //     password: password
        // }
        // dispatch(Login(user))


        

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                navigation.replace('Main')
                
                // usersRef
                //     .doc(uid)
                //     .get()
                //     .then(firestoreDocument => {
                //         if (!firestoreDocument.exists) {
                //             alert("User does not exist anymore.")
                //             return;
                //         }
                //         const user = firestoreDocument.data()
                //         alert('Logged In')
                //         navigation.navigate('Home', {user: user})
                //     })
                //     .catch(error => {
                //         alert(error)
                //     });
            })
            .catch(error => {
                alert(error)
            })
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}