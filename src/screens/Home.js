
import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, Text, View, Button, Image, Platform, TouchableOpacity } from 'react-native';
import CaloriesBurned from "../components/CaloriesBurned"
import Streak from "../components/Streak"
import * as ImagePicker from "expo-image-picker"
import Constants from "expo-constants"
import firebase from 'firebase'




const onSignOutButtonPressed = () => {
    // firebase.auth().signOut().then(function () {
    // Sign-out successful.
    firebase.auth()
        .signOut()
        .then(() => console.log('User signed out!'));
}

const Home = (props) => {


    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [image3, setImage3] = useState(null)
    const title = props.navigation.getParam("title")
    const detail = props.navigation.getParam("detail")



    useEffect(async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry');
            }
        }
    }, []);

    const pickImage = async (num) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        console.log(result)

        if (!result.cancelled) {
            switch (num) {
                case 1:
                    setImage1(result.uri)
                    props.navigation.navigate("DetailImage", { img: result.uri })
                    break
                case 2:
                    setImage2(result.uri)
                    break
                case 3:
                    setImage3(result.uri)
                    break

                default:
                    break
            }

        }
    }

    return (
        <View style={{ flex: 2 }}>
            <TouchableOpacity onPress={onSignOutButtonPressed} ><Text>Logout</Text></TouchableOpacity>

            <View style={{ flex: 1 }}>
                {/* <View style={{ flexDirection: 'row' }}>
                <CaloriesBurned />
                <Streak />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <CaloriesBurned />
                <Streak />
            </View> */}
            </View>

            <Text> {title} </Text>

            <View style={styles.layout}>
                <Text>
                    {title}
                </Text>
                <Text>
                    {detail}
                </Text>
                <View style={styles.imgSet}>
                    <Image
                        style={styles.img}
                        source={image1 ? { uri: image1 } : require('../../assets/photo.png')} />
                    <Button
                        title="add"
                        onPress={() => pickImage(1)}
                    />
                    <Button
                        title="detail"
                        onPress={() => props.navigation.navigate("DetailImage", { title: title, detail: detail })}
                    />
                </View>
                <View style={styles.imgSet}>
                    <Image
                        style={styles.img}
                        source={image2 ? { uri: image2 } : require('../../assets/photo.png')} />
                    <Button
                        title="add"
                        onPress={() => pickImage(2)}
                    />
                </View>
                <View style={styles.imgSet}>
                    <Image
                        style={styles.img}
                        source={image3 ? { uri: image3 } : require('../../assets/photo.png')} />
                    <Button
                        title="add"
                        onPress={() => pickImage(3)}
                    />
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
    botton: {
        justifyContent: "flex-end"
    },
    img: {
        width: 100,
        height: 100,

    },
    layout: {
        flexDirection: "row",
        flex: 1,
    },
    imgSet: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default Home;