import React from "react"
import { View, Image, StyleSheet, Text, TextInput, Button, Platform, Alert} from 'react-native';
import { useEffect, useState } from 'react';
import firebase from 'firebase'
// import storage from '@react-native-firebase/storage';

// const { imageName, uploadUri } = this.state;


const DetailImageScreen = (props) => {
    // const [ imageName, setImageName ] = useState('')
    // const [ uploadUri, setUploadUri ] = useState('')
    const img = props.navigation.getParam("img")
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

    const uploadImage = async () => {
        // setImage(img)
        const uri = img;
        const filename = uri;
        const uploadUri = uri;
        setUploading(true);
        setTransferred(0);
        const task = firebase.storage()
            .ref(filename)
            .putString(uploadUri);
        // set progress state
        task.on('state_changed', snapshot => {
            setTransferred(
                Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
            );
        });
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

                onPress={() => { uploadImage(); props.navigation.popToTop({ title: title, detail: detail,  cal: cal}) }}



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