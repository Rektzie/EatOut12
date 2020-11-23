
import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, Text, View, Button, Image, Platform, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
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
    // const getCal = props.navigation.getParam("cal")





    useEffect(() => {
        console.log('test')
        const didMount = async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry');
                }
            }
        }
        didMount()
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
                    props.navigation.navigate("DetailImage", { img: result, meal: 'breakfast' })
                    break
                case 2:
                    setImage2(result.uri)
                    props.navigation.navigate("DetailImage", { img: result, meal: 'lunch' })
                    break
                case 3:
                    setImage3(result.uri)
                    props.navigation.navigate("DetailImage", { img: result, meal: 'dinner' })

                    break

                default:
                    break
            }

        }
    }


    return (
        <View style={{ flex: 2 }}>


            <View style={{ flex: 2 }}>
                {/* <View style={{ flexDirection: 'row' }}>
                <CaloriesBurned />
                <Streak />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <CaloriesBurned />
                <Streak />
            </View> */}
            </View>


            {/* <View style={styles.containerate}>
          <Text style={styles.breakfast}>Breakfast</Text>
          <Text style={styles.lunch}>Lunch</Text>
          <Text style={styles.dinner}>Dinner</Text>
        </View> */}
            <View style={{ flexDirection: "column", backgroundColor: "#D3C894" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 8, marginBottom: 10, backgroundColor: "#D3C894" }}>
                    <Text style={styles.breakfast}>Breakfast</Text>
                    <Text style={styles.lunch}>Lunch</Text>
                    <Text style={styles.dinner}>Dinner</Text>
                </View>
            </View>
            <View style={styles.layout}>



                <Text>
                    {title}
                </Text>
                <Text>
                    {detail}
                </Text>

                <View style={styles.imgSet} >
                    <TouchableOpacity onPress={() => pickImage(1)}>
                        <Image
                            style={styles.img}
                            source={image1 ? { uri: image1 } : require('../../assets/photo.png')} />


                        <TouchableOpacity style={styles.adddetail} onPress={() => props.navigation.navigate("DetailImage", { title: title, detail: detail })}>
                            <Text>Add Detail</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
                <View style={styles.imgSet}>
                    <TouchableOpacity onPress={() => pickImage(2)}>
                        <Image
                            style={styles.img}
                            source={image2 ? { uri: image2 } : require('../../assets/photo.png')} />
                        <TouchableOpacity style={styles.adddetail} onPress={() => props.navigation.navigate("DetailImage", { title: title, detail: detail })}>
                            <Text>Add Detail</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
                <View style={styles.imgSet}>
                    <TouchableOpacity onPress={() => pickImage(3)}>
                        <Image
                            style={styles.img}
                            source={image3 ? { uri: image3 } : require('../../assets/photo.png')} />
                        <TouchableOpacity style={styles.adddetail} onPress={() => props.navigation.navigate("DetailImage", { title: title, detail: detail })}>
                            <Text>Add Detail</Text>
                        </TouchableOpacity>
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
        justifyContent: "center",
        backgroundColor: "#CECDBC",
    },
    adddetail: {
        height: 50,
        width: 100,
        justifyContent: "center",
        fontSize: 20,
        fontWeight: "bold",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "pink"
    },
    containerimageate: {
        flex: 1,
        flexDirection: "row",
        // justifyContent: 'space-around', 

    },
    breakfast: {
        marginRight: 10,
        marginTop: 5,
        fontWeight: "bold",
        color: "#D7385E",
        fontSize: 17,
        fontFamily: 'Athiti'
    },
    lunch: {
        marginRight: 18,
        marginTop: 5,
        fontWeight: "bold",
        color: "#D7385E",
        fontSize: 17,
        fontFamily: 'Athiti'
    },
    dinner: {
        marginRight: 12,
        marginTop: 5,
        fontWeight: "bold",
        color: "#D7385E",
        fontSize: 17,
        fontFamily: 'Athiti'
    },
});

export default Home;