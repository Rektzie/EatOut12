import React from "react"
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    Button,
    Platform,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacityBase,
    ScrollView
} from 'react-native';
import { useEffect, useState } from 'react';
import firebase from 'firebase'
import Fire from '../../Fire'
// import storage from '@react-native-firebase/storage';

// const { imageName, uploadUri } = this.state;


const DetailImageScreen = (props) => {
    // const [ imageName, setImageName ] = useState('')
    // const [ uploadUri, setUploadUri ] = useState('')
    const img = props.route.params.img
    console.log({img})
    const repast = props.route.params.repast
    const meal = props.route.params.meal
    // const gettitle = props.navigation.getParam("title")
    // const getdetail = props.navigation.getParam("detail")


    // const [savedTitle, setSavedTitle] = useState("")
    // const [savedDetail, setSavedDetail] = useState("")




    const [title, setTitle] = useState("")
    const [cal, setCal] = useState("")
    const [detail, setDetail] = useState("")
    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1; //To get the Current Month
    var year = new Date().getFullYear(); //To get the Current Year
    const auth = firebase.auth()
    const [today, setToday] = useState(auth.currentUser.uid + '-' + date + '-' + month + '-' + year)
    const [userID, setUserID] = useState(Fire.uid)

    useEffect(() => {
        const didMount = async () => {
            const db = firebase.firestore()
            const auth = firebase.auth()
            const ref = db
                .collection('users')
                .doc(auth.currentUser.uid)
                .collection('meals_history')
                .doc(today)
            const doc = await ref.get()
            if (doc.exists) {
                const repast_name = (repast === 1
                    ? 'breakfast'
                    : repast === 2
                    ? 'lunch'
                    : 'dinner')
                setCal(doc.data()[repast_name + '_cal'])
                setTitle(doc.data()[repast_name + '_title'])
                setDetail(doc.data()[repast_name + '_detail'])
            }
        }
        didMount()
    }, [])


    async function setFirebaseImageDetails(today, meal, docname, photoPath, title, cal, detail) {
        const meal_images_ref = firebase.firestore().collection('users').doc(userID).collection('meals_history')
        const uri = await firebase.storage().ref(photoPath).getDownloadURL();

        const detailObj = {
            [meal + '_image']: uri,
            [meal + '_title']: title,
            [meal + '_cal']: cal,
            [meal + '_detail']: detail,
            posted: false
        }
        await meal_images_ref.doc(today).set(detailObj, { merge: true })
    }

    const uploadImage = async () => {
        // setImage(img)
        // const filename = uri;
        const uploadUri = img;
        const photoPath = userID + '/' + today + '/' + meal + '.png'

        setUploading(true);
        setTransferred(0);
        console.log(uploadUri)
        if (Platform.OS === 'ios') {
            const response = await fetch(uploadUri);
            const blob = await response.blob();
            await firebase.storage().ref(photoPath).put(blob)
        }
        else {
            await firebase.storage()
                .ref(photoPath)
                .putString(uploadUri, 'data_url');
        }

        // set progress state
        // task.on('state_changed', snapshot => {
        //     // console.log(Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000)
        //     setTransferred(
        //         Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
        //     );
        // });
        await setFirebaseImageDetails(today, meal, 'meal_details', photoPath, title, cal, detail)


        setUploading(false);

        Alert.alert(
            'Photo uploaded!',
            'Your photo has been uploaded to Firebase Cloud Storage!'
        );
    };

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.containerall}>
                    < Image
                        style={styles.img}
                        source={img ? { uri: img } : require('../../assets/photo.png')} />
                </View>
                <View style={styles.containerall}>
                    <View style={{ flexDirection: "row", marginTop: 15 }}>
                        <Text
                            style={styles.text}
                        >ชื่ออาหาร : </Text>
                        <TextInput style={styles.input}
                            value={title} paddingLeft={20}
                            onChangeText={(text) => setTitle(text)}
                        ></TextInput></View>
                    <View style={{ flexDirection: "row" }}>
                        <Text
                            style={styles.textkcal}
                        >Kcal : </Text>
                        <TextInput style={styles.inputkcal} paddingLeft={20}
                            value={cal}
                            onChangeText={(text) => setCal(text)}
                        ></TextInput></View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.text}>คำอธิบาย : </Text>
                        <TextInput style={styles.input} paddingLeft={20} paddingTop={10}
                            multiline={true}
                            numberOfLines={4}
                            value={detail}
                            onChangeText={(text) => setDetail(text)}
                        ></TextInput></View>
                </View>


                <View style={{ marginTop: 20, alignItems: "center" }}>
                    <TouchableOpacity disabled={uploading} style={styles.button} onPress={async () => { await uploadImage(); props.navigation.popToTop({ title: title, detail: detail, cal: cal }) }}>
                        {
                            uploading
                            ? <ActivityIndicator size="large" />
                            : <Text style={{ color: "white", fontSize: 18 }}>Save</Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </TouchableWithoutFeedback>
        //          <Button
        //     title="save"
        //     style={styles.text}

        //     onPress={() => { uploadImage(); props.navigation.popToTop({ title: title, detail: detail, cal: cal }) }}


        // /> 
    )
}


const styles = StyleSheet.create({
    containerall: {
        alignItems: "center"

    },

    img: {
        width: 300,
        height: 300,
        margin: 20,
        marginTop: 40


    },
    inputkcal: {
        width: "50%",
        height: 38,
        borderWidth: 0.5,
        borderColor: "#707070",
        borderRadius: 20,
        marginBottom: 20,
        marginLeft: 40
    },
    container: {
        width: '100%',
        justifyContent: "center",

    },
    text: {
        fontWeight: 'bold',
        fontSize: 17,
        margin: 10,
        lineHeight: 20
    },
    textkcal: {
        fontWeight: 'bold',
        fontSize: 17,
        lineHeight: 36,
        marginLeft: 10
    },
    input: {
        width: "50%",
        height: 38,
        borderWidth: 0.5,
        borderColor: "#707070",
        borderRadius: 20,
        marginBottom: 20
    },
    button: {
        width: 160,
        borderRadius: 20,
        height: 55,
        backgroundColor: "#0087FF",
        alignItems: "center",
        justifyContent: "center"
    }
})

export default DetailImageScreen;