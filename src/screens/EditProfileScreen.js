import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View, Image, Button, Platform } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';
import firebase from 'firebase'
import * as ImagePicker from "expo-image-picker"
// id: uid,
// email,
// fullName,
// age : "",
// BMI : "",
// weight : "",
// height : ""

export default function EditProfileScreen(props) {
    const [image, setImage] = useState(null)
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
    const updateUser = () => {

        const updateDBRef = firebase.firestore().collection('users').doc(uid)
        updateDBRef.set({
            id: uid,
            email: userData.email,
            fullName: userData.fullName,
            age: userData.age,
            BMI: userData.BMI,
            weight: userData.weight,
            height: userData.height,
        }).then((docRef) => {
            setUserData(
                {
                    
                    email: user.email,
                    fullName: user.fullName,
                    age: user.age,
                    BMI: user.BMI,
                    weight: user.weight,
                    height: user.height,
                })
            // props.navigation.pop();
        })
            .catch((error) => {
                console.error("Error: ", error);

            });
    };

    useEffect(async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry');
            }
        }

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
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        console.log(result)

        if (!result.cancelled) {
            setImage(result.uri)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.containerprofileimageandedit}>

                {/* <Text>{height}</Text> */}



                <Image style={{ width: 150, height: 150, }}

                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
                <View style={{ flexDirection: "row" }}>
                    <MaterialIcons name="edit" size={25} color="gray" style={{ marginRight: 5 }} />
                    <Button
                        title="Edit Picture"
                        onPress={() => { props.navigation.navigate("EditProfile") }}
                    ></Button>
                    {/* <Text style={styles.texteidtprofile}>Edit Profile</Text> */}

                </View>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", marginTop: 10, }}>
                    <Text style={styles.nameandemail}>Name</Text>
                    <TextInput
                        paddingLeft={20}
                        style={styles.inputnameandemail}
                        value={userData.fullName}
                        onChangeText={text => setUserData({ ...userData, fullName: text })}
                    ></TextInput>
                </View>

                <View style={{ flexDirection: "row", marginTop: 15 }}>
                    <Text style={styles.nameandemail}>Email</Text>
                    <TextInput paddingLeft={20} style={styles.inputnameandemail} value={userData.email} onChangeText={text => setUserData({ ...userData, email: text })}></TextInput>

                </View>

                <View style={styles.line} />


                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.age}>Age</Text>
                    <TextInput paddingLeft={20} style={styles.inputage} value={userData.age} onChangeText={text => setUserData({ ...userData, age: text })}></TextInput>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.bmi}>BMI</Text>
                        <TextInput paddingLeft={20} style={styles.inputbmi} value={userData.BMI} onChangeText={text => setUserData({ ...userData, BMI: text })}></TextInput>
                    </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.weight}>Weight</Text>
                    <TextInput paddingLeft={20} style={styles.inputweight} value={userData.weight} onChangeText={text => setUserData({ ...userData, weight: text })}></TextInput>

                    <Text style={styles.height}>Height</Text>
                    <TextInput paddingLeft={20} style={styles.inputheight} value={userData.height} onChangeText={text => setUserData({ ...userData, height: text })}></TextInput>
                </View>

                <View style={styles.line} />
                <Button
                    title="save"
                    onPress={() => updateUser()}
                ></Button>
                {/* <View style={{ flexDirection: "row" }}>
          <Text style={styles.goal}>Goal Reached Streak</Text>
          <Text editable={false} selectTextOnFocus={false} onEndEditing={false} paddingLeft={20} style={styles.inputgoal}><Text>5สมมติเลข</Text></Text>
        </View> */}
            </View>

            {/* <View style={{ flex: 1 }}>
                <View style={{ justifyContent: "center", alignItems: "center", flex: 1, marginTop: 20 }}>
                    <TouchableOpacity style={styles.logoutbutton}>
                        <Text style={styles.textlogout}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View> */}
        </View>

    )
}

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
        fontFamily: 'Athiti'
    },
    nameandemail: {
        marginTop: 5,
        marginLeft: 20,
        fontWeight: "bold",
        color: "#707070",
        fontSize: 18,
        fontFamily: 'Athiti'
    },
    inputnameandemail: {
        marginLeft: 20,
        width: "52%",
        height: 30,
        borderWidth: 0.5,
        borderColor: "#3186FF",
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
        fontFamily: 'Athiti'
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
        fontFamily: 'Athiti'
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
        fontFamily: 'Athiti'
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
        fontFamily: 'Athiti'
    },
    inputheight: {
        marginTop: 20,
        width: "25%",
        height: 30,
        borderWidth: 0.5,
        borderColor: "#3186FF",
        borderRadius: 20
    },
    // goal: {
    //   marginTop: 23,
    //   marginLeft: 20,
    //   fontWeight: "bold",
    //   color: "#707070",
    //   fontSize: 18,
    //   fontFamily: 'Athiti'
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
        backgroundColor: "#585858"
    },
    textlogout: {
        fontWeight: "bold",
        color: "white",
        fontSize: 18,
        fontFamily: 'Athiti'
    },
    containerprofileimageandedit: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }


});
