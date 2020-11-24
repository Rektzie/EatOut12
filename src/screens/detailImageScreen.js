import React from "react"
import { View, Image, StyleSheet, Text, TextInput, Button, Platform, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import firebase from 'firebase'
import Fire from '../../Fire'
// import storage from '@react-native-firebase/storage';

// const { imageName, uploadUri } = this.state;


const DetailImageScreen = (props) => {
    // const [ imageName, setImageName ] = useState('')
    // const [ uploadUri, setUploadUri ] = useState('')
    const img = props.navigation.getParam("img")
    const meal = props.navigation.getParam("meal")
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
    const [today, setToday] = useState(date+'-'+ month+'-'+year)
    const [userID, setUserID] = useState(Fire.uid)

    
    function setFirebaseImageDetails(today, meal, docname, photoPath, title, cal, detail){
        const meal_images_ref = firebase.firestore().collection('users').doc(userID).collection('meals_history')
        
        const detailObj = {
            [meal+'_image']: photoPath,
            [meal+'_title']: title,
            [meal+'_cal']: cal,
            [meal+'_detail']: detail,
            posted: false
        }
        meal_images_ref.doc(today).set(detailObj, {merge: true})
    }

    const uploadImage = async () => {
        // setImage(img)
        // const filename = uri;
        const uploadUri = img;
        const photoPath = userID + '/' + today + '/' + meal + '.png'
        
        setUploading(true);
        setTransferred(0);
        console.log(uploadUri)
        let task
        if (Platform.OS === 'ios') {
            const response = await fetch(uploadUri);
            const blob = await response.blob();
            task = firebase.storage().ref(photoPath).put(blob)
        }
        else {
            task = firebase.storage()
                .ref(photoPath)
                .putString(uploadUri, 'data_url');
        }

        // set progress state
        task.on('state_changed', snapshot => {
            // console.log(Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000)
            setTransferred(
                Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
            );
        });
        setFirebaseImageDetails(today, meal, 'meal_details', photoPath, title, cal, detail)

        try {
            await task();
        } catch (e) {
            console.error(e);
        }

        

        
        setUploading(false);

        Alert.alert(
            'Photo uploaded!',
            'Your photo has been uploaded to Firebase Cloud Storage!'
        );
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={img ? { uri: img } : require('../../assets/photo.png')} />
            <Text
                style={styles.text}

            >ชื่ออาหาร : </Text>
            <TextInput
                value={title}
                onChangeText={(text) => setTitle(text)}
            ></TextInput>
            <Text
                style={styles.text}

            >แคลอรี : </Text>
            <TextInput
                value={cal}
                onChangeText={(text) => setCal(text)}
            ></TextInput>
            <Text style={styles.text}>คำอธิบาย : </Text>
            <TextInput
                multiline={true}
                numberOfLines={4}
                value={detail}
                onChangeText={(text) => setDetail(text)}
            ></TextInput>
            <Button
                title="save"
                style={styles.text}

                onPress={() => { uploadImage(); props.navigation.popToTop({ title: title, detail: detail, cal: cal }) }}



            />
        </View>
    )
}


const styles = StyleSheet.create({

    img: {
        width: 300,
        height: 300,
        margin: 20

    },
    container: {
        width: '80%'
    },
    text: {
        margin: 10
    }
})

export default DetailImageScreen;