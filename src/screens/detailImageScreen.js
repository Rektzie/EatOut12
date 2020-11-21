import React from "react"
import { View, Image, StyleSheet, Text, TextInput, Button } from 'react-native';
import { useEffect, useState } from 'react';

const DetailImageScreen = (props) => {
    const img = props.navigation.getParam("img")
    // const gettitle = props.navigation.getParam("title")
    // const getdetail = props.navigation.getParam("detail")


    // const [savedTitle, setSavedTitle] = useState("")
    // const [savedDetail, setSavedDetail] = useState("")


    const [title, setTitle] = useState("")
    const [detail, setDetail] = useState("")

    const onSaveButtonPressed = () => {
        const { imageName, uploadUri } = this.state;
        firebase
            .storage()
            .ref(imageName)
            .putFile(uploadUri)
            .then((snapshot) => {
                //You can check the image is now uploaded in the storage bucket
                console.log(`${imageName} has been successfully uploaded.`);
            })
            .catch((e) => console.log('uploading image error => ', e));
    }

    console.log(img)
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
                onPress={() => { props.navigation.popToTop({ title: title, detail: detail }) }}
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