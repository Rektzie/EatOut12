import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View, Image, Button, Platform, Keyboard, TouchableWithoutFeedback, TouchableOpacityBase, ImageBackground, ActivityIndicator } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';
import firebase from 'firebase'
import * as ImagePicker from "expo-image-picker"
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// id: uid,
// email,
// fullName,
// age : "",
// BMI : "",
// weight : "",
// height : ""

export default function EditProfileScreen(props) {
    const [weight, setweight] = useState(true),
        [height, setheight] = useState(true),
        [bmi, setbmi] = useState(0),
        [isLoading, setIsLoading] = useState(false)

    const calculatebmi = (weight, height) => {

        if (weight > 0 && height > 0) {
            var finalBmi = weight / (height / 100 * height / 100);
            setbmi(finalBmi.toFixed(2));

        }

    }


    const [image, setImage] = useState(null)
    const [isImageUpload, setIsImageUpload] = useState(false)
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
    const updateUser = async () => {
        const updateDBRef = firebase.firestore().collection('users').doc(uid)
        setIsLoading(true)
        const photoPath = 'profile/' + uid + '/profile.png'
        let downloadurl
        if (image && isImageUpload) {
            if (Platform.OS === 'ios') {
                const response = await fetch(image);
                const blob = await response.blob();
                await firebase.storage().ref(photoPath).put(blob)
            }
            else {
                firebase.storage()
                    .ref(photoPath)
                    .putString(image, 'data_url');
            }
            downloadurl = await firebase.storage().ref().child(photoPath).getDownloadURL();
        }

        if (downloadurl) {
            await updateDBRef.set({
                imageprofile: downloadurl
            }, { merge: true })
        }

        await updateDBRef.set({
            email: userData.email,
            fullName: userData.fullName,
            age: userData.age,
            BMI: bmi,
            weight: weight,
            height: height,
        }, { merge: true }).then((docRef) => {
            // setUserData(
            //     {

            //         email: user.email,
            //         fullName: user.fullName,
            //         age: user.age,
            //         BMI: user.BMI,
            //         weight: user.weight,
            //         height: user.height,
            //     })
            setIsLoading(false)
            props.navigation.popToTop();
        })
            .catch((error) => {
                console.error("Error: ", error);
                setIsLoading(false)
            });
    };

    useEffect(() => {
        const didMount = async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    // alert('Sorry');
                    console.log('Sorry')
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
                    setImage(
                        user.imageprofile
                    )
                    setweight(
                        parseInt(user.weight)
                    )
                    setheight(
                        parseInt(user.height)
                    )
                    calculatebmi(
                        parseInt(user.weight),
                        parseInt(user.height)
                    )
                } else {
                    console.log("Document does not exist!");
                }
            });
        }
        didMount()
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
            setIsImageUpload(true)
        } else {
            setImage(null)
            setIsImageUpload(false)
        }
    }

    const img = { uri: "https://sv1.picz.in.th/images/2020/11/23/bFYp8t.jpg" };
    console.log({ bmi })
    return (
        <ImageBackground style={styles.img}
            source={img} >
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }}>

                <ScrollView >


                    <View style={styles.containerprofileimageandedit}>

                        {/* <Text>{height}</Text> */}



                        <LinearGradient colors={['#ae1e1e', '#ff005f', '#ffcc00']}
                            stops={[0, 35, 100]}
                            style={styles.imagecolor} >
                            <Image style={styles.imageprofile}

                                source={
                                    image ? { uri: image } : require('../../assets/profile.png')

                                }
                            />
                        </LinearGradient>
                        <View style={{ flexDirection: "row" }}>
                            <MaterialIcons name="edit" size={25} color="gray" style={{ marginRight: 5 }} />
                            <Button
                                title="Edit Picture"
                                onPress={pickImage}
                            ></Button>
                            {/* <Text style={styles.texteidtprofile}>Edit Profile</Text> */}

                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "center" }}>
                            <Text style={styles.nameandemail}>Name</Text>
                            <TextInput
                                paddingLeft={20}
                                style={styles.inputnameandemail}
                                value={userData.fullName}
                                onChangeText={text => setUserData({ ...userData, fullName: text })}
                            ></TextInput>
                        </View>

                        <View style={{ flexDirection: "row", marginTop: 15, justifyContent: "center" }}>
                            <Text style={styles.nameandemail}>Email</Text>
                            <TextInput paddingLeft={20} style={styles.inputnameandemail} value={userData.email}></TextInput>

                        </View>

                        <View style={styles.line} />


                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <Text style={styles.age}>Age</Text>
                            <TextInput paddingLeft={20} style={styles.inputage} value={userData.age} onChangeText={text => setUserData({ ...userData, age: text })}></TextInput>
                            <Text style={styles.bmi}>BMI</Text>
                            <Text paddingLeft={20} style={styles.inputbmi} >{bmi}</Text>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <Text style={styles.weight}>Weight</Text>
                            <TextInput paddingLeft={20} style={styles.inputweight} value={userData.weight.toString()} onChangeText={text => {
                                setUserData({ ...userData, weight: text })
                                if (text == '') {
                                    text = 0
                                }
                                setweight(parseInt(text))
                                calculatebmi(parseInt(text), height)

                            }}></TextInput>

                            <Text style={styles.height}>Height</Text>
                            <TextInput paddingLeft={20} style={styles.inputheight} value={userData.height.toString()} onChangeText={text => {
                                setUserData({ ...userData, height: text })
                                if (text == '') {
                                    text = 0
                                }
                                setheight(parseInt(text))
                                calculatebmi(weight, parseInt(text))
                            }}></TextInput>
                        </View>


                        <View style={{ flex: 1 }}>
                            <TouchableOpacity disabled={isLoading} style={styles.savebutton}
                                onPress={() => updateUser()}
                            >
                                {
                                    isLoading ? <ActivityIndicator />
                                        : <Text style={styles.textsave}>Save</Text>
                                }
                            </TouchableOpacity>
                        </View>

                    </View>


                </ScrollView>
            </TouchableWithoutFeedback>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    img: {
        height: "100%",
        width: "100%",
        flex: 1,

    },
    texteidtprofile: {
        marginRight: 20,
        marginTop: 20,
        fontWeight: "bold",
        color: "#707070",
        fontSize: 18,
        // fontFamily: 'Athiti'
    },
    nameandemail: {
        marginTop: 5,
        marginLeft: 20,
        fontWeight: "bold",
        color: "#707070",
        fontSize: 18,
        // fontFamily: 'Athiti'
    },
    inputnameandemail: {
        marginLeft: 20,
        width: "52%",
        height: 35,
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
        // fontFamily: 'Athiti'
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
        // fontFamily: 'Athiti'
    },
    inputbmi: {
        marginLeft: 20,
        marginTop: 20,
        width: "25%",
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
        // fontFamily: 'Athiti'
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
        // fontFamily: 'Athiti'
    },
    inputheight: {
        marginTop: 20,
        width: "25%",
        height: 30,
        borderWidth: 0.5,
        borderColor: "#3186FF",
        borderRadius: 20
    },

    inputgoal: {
        marginTop: 20,
        marginLeft: 32,
        width: "25%",
        height: 30,
        borderWidth: 0.5,
        borderColor: "#3186FF",
        borderRadius: 20
    },
    savebutton: {
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 18,
        width: 150,
        height: 50,
        marginTop: 30,
        backgroundColor: "#0068ff"
    },
    textsave: {
        fontWeight: "bold",
        color: "white",
        fontSize: 18,
        // fontFamily: 'Athiti'
    },
    containerprofileimageandedit: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        marginTop: 20
    },
    imageprofile: {
        width: 110,
        height: 110,
        borderRadius: 50,
        overflow: "hidden",
        borderColor: "black",
        borderWidth: 3,


    },

    imagecolor: {
        borderRadius: 69,
        overflow: 'hidden',
        height: 135,
        width: 135,
        justifyContent: 'center',
        alignItems: "center",
        marginLeft: 20,
        marginTop: 10
    },

});
