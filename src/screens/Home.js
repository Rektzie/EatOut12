
import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, Text, View, Button, Image, Platform, TouchableOpacity, FlatList, SafeAreaView, ImageBackground, ActivityIndicator } from 'react-native';
import CaloriesBurned from "../components/CaloriesBurned"
import Streak from "../components/Streak"
import * as ImagePicker from "expo-image-picker"
import firebase from 'firebase'
import Fire from '../../Fire';

const Home = (props) => {


    var date = new Date().getDate();
    var month = new Date().getMonth() + 1; //To get the Current Month
    var year = new Date().getFullYear(); //To get the Current Year
    const auth = firebase.auth()

    const [isLoading, setIsLoading] = useState(false)
    const [today, setToday] = useState(date + '-' + month + '-' + year)
    const userID = Fire.uid
    const [hasPosted, setHasPosted] = useState(false)




    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [image3, setImage3] = useState(null)
    const title = props.route.title
    const detail = props.route.detail
    // const getCal = props.navigation.getParam("cal")
    const [objList, setObjList] = useState([])



    const getImageFromFirebase = (setImgFunc, meal) => {
        const photoPath = userID + '/' + today + '/' + meal + '.png'
        let imageRef = firebase.storage().ref(photoPath);


        imageRef
            .getDownloadURL()
            .then((url) => {
                //from url you can fetched the uploaded image easily
                setImgFunc(url);
            })
            .catch((e) => console.log('getting downloadURL of image error => ', e));


    }


    useEffect(() => {
        const didMount = async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry');
                }
            }
            getImageFromFirebase(setImage1, 'breakfast')
            getImageFromFirebase(setImage2, 'lunch')
            getImageFromFirebase(setImage3, 'dinner')
            const db =firebase.firestore()
            const auth = firebase.auth()
            const ref = db.collection('post_lists').doc(today + '_' + auth.currentUser.uid)
            const docs = await ref.get()
            if (docs.exists) setHasPosted(true)
        }
        didMount()
        console.log(objList)



    }, []);

    const pickImage = async (num) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })


        if (!result.cancelled) {
            switch (num) {
                case 1:
                    setImage1(result.uri)
                    console.log(result.uri)
                    props.navigation.navigate("DetailImage", { img: result.uri, meal: 'breakfast' })
                    break
                case 2:
                    setImage2(result.uri)
                    props.navigation.navigate("DetailImage", { img: result.uri, meal: 'lunch' })
                    break
                case 3:
                    setImage3(result.uri)
                    props.navigation.navigate("DetailImage", { img: result.uri, meal: 'dinner' })

                    break

                default:
                    break
            }

        }
    }

    async function setPosted() {
        setIsLoading(true)
        if (!image1 || !image2 || !image3) {
            setIsLoading(false)
            alert('Please insert all image')
            return
        }
        if (hasPosted) {
            setIsLoading(false)
            alert('you have posted today')
            return
        }
        const post_ref = firebase.firestore().collection('users').doc(userID).collection('meals_history').doc(today)
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const post_list = firebase.firestore().collection('post_lists')

        post_ref.set({ posted: true, createdAt: timestamp }, { merge: true })
        const post_docs = await post_ref.get()
        const dailyObject = post_docs.data()
        dailyObject.owner = userID
        // ขอโทษที อ่านโค้ดไม่เข้าใจเลยเขียนใหม่ 555555555555555555
        await post_list.doc(today + '_' + userID).set(dailyObject)
        setIsLoading(false)
        alert('Post Complete')
    }

    console.log({ title })
    // if (isLoading) setIsLoading(false)
    return (
        
        <ImageBackground style={styles.imgg} source={require('../../assets/bg.jpg')}>
        <View style={{ flex: 2 }}>
            <View style={{alignItems:"center", justifyContent:"center", flexDirection:"row", flex:1}}>
                <Text style={styles.texttitle}>Let Shared Your Food in a day!</Text>
            </View>
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


                        <TouchableOpacity style={styles.adddetail} onPress={() =>
                            props.navigation.navigate("DetailImage", {
                                title, detail, img: image1, repast: 1, meal: 'breakfast'
                            })}>
                            <Text>Add Detail</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
                <View style={styles.imgSet}>
                    <TouchableOpacity onPress={() => pickImage(2)}>
                        <Image
                            style={styles.img}
                            source={image2 ? { uri: image2 } : require('../../assets/photo.png')} />
                        <TouchableOpacity style={styles.adddetail} onPress={() =>
                            props.navigation.navigate("DetailImage", {
                                title, detail, img: image2, repast: 2, meal: 'lunch'
                            })}>
                            <Text>Add Detail</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
                <View style={styles.imgSet}>
                    <TouchableOpacity onPress={() => pickImage(3)}>
                        <Image
                            style={styles.img}
                            source={image3 ? { uri: image3 } : require('../../assets/photo.png')} />
                        <TouchableOpacity style={styles.adddetail} onPress={() =>
                            props.navigation.navigate("DetailImage", {
                                title, detail, img: image3, repast: 3, meal: 'dinner'
                            })}>
                            <Text>Add Detail</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
                
            </View>
            <View style={{alignItems:"center", marginTop:20}}>
            <TouchableOpacity style={styles.postbutton} disabled={isLoading} onPress={setPosted}>
                {
                    isLoading ? <ActivityIndicator />:<Text style={styles.post}>Post</Text>
                }
            </TouchableOpacity>
            </View>
{/* 
            {
                objList.map(each => {
                    return (
                        <View style={styles.item}>
                            <Text style={styles.title}>{each.breakfast_image}</Text>
                        </View>
                    )
                })
            } */}

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

            {/* <Button title="Post" disabled={dailyObject ? dailyObject.posted === true && (!(image1 && image2 && image3)) : false} onPress={() => setPosted()}></Button> */}


            {/* <View style={styles.containerate}>
          <Text style={styles.breakfast}>Breakfast</Text>
          <Text style={styles.lunch}>Lunch</Text>
          <Text style={styles.dinner}>Dinner</Text>
        </View> */}
            {/* <View style={{ flexDirection: "column", backgroundColor: "#D3C894" }}>
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


                        <TouchableOpacity style={styles.adddetail} onPress={() =>
                            props.navigation.navigate("DetailImage", {
                                title, detail, img: image1, repast: 1
                            })}>
                            <Text>Add Detail</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
                <View style={styles.imgSet}>
                    <TouchableOpacity onPress={() => pickImage(2)}>
                        <Image
                            style={styles.img}
                            source={image2 ? { uri: image2 } : require('../../assets/photo.png')} />
                        <TouchableOpacity style={styles.adddetail} onPress={() =>
                            props.navigation.navigate("DetailImage", {
                                title, detail, img: image2, repast: 2
                            })}>
                            <Text>Add Detail</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
                <View style={styles.imgSet}>
                    <TouchableOpacity onPress={() => pickImage(3)}>
                        <Image
                            style={styles.img}
                            source={image3 ? { uri: image3 } : require('../../assets/photo.png')} />
                        <TouchableOpacity style={styles.adddetail} onPress={() =>
                            props.navigation.navigate("DetailImage", {
                                title, detail, img: image3, repast: 3
                            })}>
                            <Text>Add Detail</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </View> */}
        </View>
        </ImageBackground>

    );
};


const styles = StyleSheet.create({
    post:{
        fontSize:18,
        color:"white",
        fontWeight:"bold"
    },
    imgg:{
        width:"100%",
        height:"100%"
    },
    postbutton:{
        justifyContent:"center",
        alignItems:"center",
        width:160,
        height:60,
        backgroundColor:"#009aff",
        borderRadius:20
    },
    texttitle:{
        fontSize:25,
        fontWeight:'bold',
    },
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
        flex: 1.5,
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
        // fontFamily: 'Athiti'
    },
    lunch: {
        marginRight: 18,
        marginTop: 5,
        fontWeight: "bold",
        color: "#D7385E",
        fontSize: 17,
        // fontFamily: 'Athiti'
    },
    dinner: {
        marginRight: 12,
        marginTop: 5,
        fontWeight: "bold",
        color: "#D7385E",
        fontSize: 17,
        // fontFamily: 'Athiti'
    },
});

export default Home;