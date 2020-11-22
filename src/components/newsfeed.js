import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View, Easing, Image, ImageBackground, Button } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase'

const Newsfeed = () => {

  const [snap, setSnap] = useState()

  const Test = async () => {
    // const dbRef = firebase.firestore().collection('users')
    // dbRef
    //   .get()
    //   .then(snapshot => {
    //     snapshot
    //       .docs
    //       .forEach(doc => {


    //         <Text>{JSON.parse(doc._document.fullName.toString())}</Text>
    //       });
    //   });



    
    
  }





  return (
    <ScrollView>
      <View style={{ backgroundColor: "#9100FF" }}>
        <View style={styles.header}>
          <Text>{snap}</Text>
          <LinearGradient colors={['#ae1e1e', '#ff005f', '#ffcc00']}
            stops={[0, 35, 100]}
            style={styles.imagecolor} >
            <Image style={styles.imageprofile}

              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Beauty_girl.jpg/499px-Beauty_girl.jpg',
              }}
            />
          </LinearGradient>
          <Button
            title="test"
            onPress={() => Test()}
          >
          </Button>
          <Text style={styles.headertextname}>
            Ploy.sucha
        </Text>
          <View style={{ flexDirection: "row", marginLeft: 15 }}>
            <AntDesign name="wechat" size={40} color="#B0CDF6" />
          </View>

        </View>
      </View>
      <View style={{ flexDirection: "column" }}>
        <View style={{ flexDirection: "row", margin: 10 }}>
          <Text style={styles.headershared}>Ploy.sucha Shared Total Ate 1020 Kcal</Text>
        </View>
        <View style={styles.containerate}>
          <Text style={styles.breakfast}>Breakfast</Text>
          <Text style={styles.lunch}>Lunch</Text>
          <Text style={styles.dinner}>Dinner</Text>
        </View>
        <View style={styles.containerimageate}>
          <Image style={{ width: 120, height: 90, }}

            source={{
              uri: 'https://images.squarespace-cdn.com/content/v1/5c271646f8370a65dab2c142/1575302182439-TDG6EMNNP6WS6ZH0RR9K/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0s0XaMNjCqAzRibjnE_wBlkZ2axuMlPfqFLWy-3Tjp4nKScCHg1XF4aLsQJlo6oYbA/IMG_9041+copy.jpg',
            }} />
          <Image style={{ width: 120, height: 90, }}

            source={{
              uri: 'https://images.squarespace-cdn.com/content/v1/5c271646f8370a65dab2c142/1575302182439-TDG6EMNNP6WS6ZH0RR9K/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0s0XaMNjCqAzRibjnE_wBlkZ2axuMlPfqFLWy-3Tjp4nKScCHg1XF4aLsQJlo6oYbA/IMG_9041+copy.jpg',
            }} />
          <Image style={{ width: 120, height: 90, }}

            source={{
              uri: 'https://images.squarespace-cdn.com/content/v1/5c271646f8370a65dab2c142/1575302182439-TDG6EMNNP6WS6ZH0RR9K/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0s0XaMNjCqAzRibjnE_wBlkZ2axuMlPfqFLWy-3Tjp4nKScCHg1XF4aLsQJlo6oYbA/IMG_9041+copy.jpg',
            }} />

        </View>

        <View style={styles.containerkcal}>
          <TextInput style={styles.inputkcal}>
            <Text style={styles.textkcal}>320 Kcal</Text>
          </TextInput>
          <TextInput style={styles.inputkcal}>
            <Text style={styles.textkcal}>250 Kcal</Text>
          </TextInput>
          <TextInput style={styles.inputkcal}>
            <Text style={styles.textkcal}>250 Kcal</Text>
          </TextInput>
        </View>


      </View>

      <View style={styles.line} />



      <View style={{ backgroundColor: "#9100FF", marginTop: 10 }}>
        <View style={styles.header}>
          <LinearGradient colors={['#ae1e1e', '#ff005f', '#ffcc00']} style={styles.imagecolor} >
            <Image style={styles.imageprofile}

              source={{
                uri: 'https://www.eurotimes.org/wp-content/uploads/2020/03/mona-lisa-with-face-mask-3957982-e1584612250409-1024x717.jpg',
              }}
            />
          </LinearGradient>
          <Text style={styles.headertextname}>
            ramon_lisa
        </Text>
          <View style={{ flexDirection: "row", marginLeft: 15 }}>
            <AntDesign name="wechat" size={40} color="#B0CDF6" />
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "column" }}>
        <View style={{ flexDirection: "row", margin: 10 }}>
          <Text style={styles.headershared}>ramon_lisa Shared Eating Activities</Text>
        </View>
        <View style={styles.containerate}>
          <Text style={styles.breakfast}>Breakfast</Text>
          <Text style={styles.lunch}>Lunch</Text>
          <Text style={styles.dinner}>Dinner</Text>
        </View>
        <View style={styles.containerimageate}>
          <Image style={{ width: 120, height: 90, }}
            source={{
              uri: 'https://images.squarespace-cdn.com/content/v1/5c271646f8370a65dab2c142/1570548842579-GA58PSS6CIUIDIBFPELH/ke17ZwdGBToddI8pDm48kMFiMyT1nneRMhnmfuSfpxZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0mlM0or4nqX7jrn5yWu0hA1QXedaIFqnAbw_tQShHbKg4-O_KAc44ak5jGzrnn7f3A/IMG_9286.jpg',
            }} />
          <Image style={{ width: 120, height: 90, }}

            source={{
              uri: 'https://images.squarespace-cdn.com/content/v1/5c271646f8370a65dab2c142/1570548842579-GA58PSS6CIUIDIBFPELH/ke17ZwdGBToddI8pDm48kMFiMyT1nneRMhnmfuSfpxZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0mlM0or4nqX7jrn5yWu0hA1QXedaIFqnAbw_tQShHbKg4-O_KAc44ak5jGzrnn7f3A/IMG_9286.jpg',
            }} />
          <Image style={{ width: 120, height: 90, }}

            source={{
              uri: 'https://images.squarespace-cdn.com/content/v1/5c271646f8370a65dab2c142/1570548842579-GA58PSS6CIUIDIBFPELH/ke17ZwdGBToddI8pDm48kMFiMyT1nneRMhnmfuSfpxZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0mlM0or4nqX7jrn5yWu0hA1QXedaIFqnAbw_tQShHbKg4-O_KAc44ak5jGzrnn7f3A/IMG_9286.jpg',
            }} />

        </View>

        <View style={styles.containerkcal}>
          <TextInput style={styles.inputkcal}>
            <Text style={styles.textkcal}>320 Kcal</Text>
          </TextInput>
          <TextInput style={styles.inputkcal}>
            <Text style={styles.textkcal}>250 Kcal</Text>
          </TextInput>
          <TextInput style={styles.inputkcal}>
            <Text style={styles.textkcal}>250 Kcal</Text>
          </TextInput>
        </View>


      </View>

      <View style={styles.line} />

      <View style={{ backgroundColor: "#9100FF", marginTop: 10 }}>
        <View style={styles.header}>
          <LinearGradient colors={['#ae1e1e', '#ff005f', '#ffcc00']} style={styles.imagecolor} >
            <Image style={styles.imageprofile}

              source={{
                uri: 'https://i.pinimg.com/originals/cb/44/fd/cb44fde77872ff9f9e37a2ed89c6e284.jpg',
              }}
            />
          </LinearGradient>
          <Text style={styles.headertextname}>
            Schhh.non
        </Text>
          <View style={{ flexDirection: "row", marginLeft: 15 }}>
            <AntDesign name="wechat" size={40} color="#B0CDF6" />
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "column" }}>
        <View style={{ flexDirection: "row", margin: 10 }}>
          <Text style={styles.headershared}>Schhh.non Shared Eating Activities</Text>
        </View>
        <View style={styles.containerate}>
          <Text style={styles.breakfast}>Breakfast</Text>
          <Text style={styles.lunch}>Lunch</Text>
          <Text style={styles.dinner}>Dinner</Text>
        </View>
        <View style={styles.containerimageate}>
          <Image style={{ width: 120, height: 90, }}
            source={{
              uri: 'https://images.squarespace-cdn.com/content/v1/5c271646f8370a65dab2c142/1570545947530-AZUYMEMWKU2D47HKOEKS/ke17ZwdGBToddI8pDm48kMFiMyT1nneRMhnmfuSfpxZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0mlM0or4nqX7jrn5yWu0hA1QXedaIFqnAbw_tQShHbKg4-O_KAc44ak5jGzrnn7f3A/IMG_8179.jpg',
            }} />
          <Image style={{ width: 120, height: 90, }}

            source={{
              uri: 'https://images.squarespace-cdn.com/content/v1/5c271646f8370a65dab2c142/1570545947530-AZUYMEMWKU2D47HKOEKS/ke17ZwdGBToddI8pDm48kMFiMyT1nneRMhnmfuSfpxZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0mlM0or4nqX7jrn5yWu0hA1QXedaIFqnAbw_tQShHbKg4-O_KAc44ak5jGzrnn7f3A/IMG_8179.jpg',
            }} />
          <Image style={{ width: 120, height: 90, }}

            source={{
              uri: 'https://images.squarespace-cdn.com/content/v1/5c271646f8370a65dab2c142/1570545947530-AZUYMEMWKU2D47HKOEKS/ke17ZwdGBToddI8pDm48kMFiMyT1nneRMhnmfuSfpxZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0mlM0or4nqX7jrn5yWu0hA1QXedaIFqnAbw_tQShHbKg4-O_KAc44ak5jGzrnn7f3A/IMG_8179.jpg',
            }} />

        </View>

        <View style={styles.containerkcal}>
          <TextInput style={styles.inputkcal}>
            <Text style={styles.textkcal}>320 Kcal</Text>
          </TextInput>
          <TextInput style={styles.inputkcal}>
            <Text style={styles.textkcal}>250 Kcal</Text>
          </TextInput>
          <TextInput style={styles.inputkcal}>
            <Text style={styles.textkcal}>250 Kcal</Text>
          </TextInput>
        </View>


      </View>

      <View style={styles.line} />

    </ScrollView>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    justifyContent: "flex-start",
    flex: 1,
    flexDirection: "row",
    margin: 10,
    backgroundColor: "#9100FF"
  },
  imagecolor: {
    borderRadius: 35,
    overflow: 'hidden',
    height: 68,
    width: 68,
    justifyContent: 'center',
    alignItems: "center"
  },
  imageprofile: {
    width: 60,
    height: 60,
    borderRadius: 50,
    overflow: "hidden",
    borderColor: "black",
    borderWidth: 2
  },
  headertextname: {
    marginLeft: 15,
    marginTop: 5,
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
    fontFamily: 'Athiti'
  },
  headershared: {
    marginTop: 5,
    fontWeight: "bold",
    color: "#707070",
    fontSize: 16,
    fontFamily: 'Athiti'
  },
  breakfast: {
    marginRight: 20,
    marginTop: 5,
    fontWeight: "bold",
    color: "#D7385E",
    fontSize: 16,
    fontFamily: 'Athiti'
  },
  lunch: {
    marginRight: 25,
    marginLeft: 10,
    marginTop: 5,
    fontWeight: "bold",
    color: "#D7385E",
    fontSize: 16,
    fontFamily: 'Athiti'
  },
  dinner: {
    marginLeft: 10,
    marginRight: 20,
    marginTop: 5,
    fontWeight: "bold",
    color: "#D7385E",
    fontSize: 16,
    fontFamily: 'Athiti'
  },
  inputkcal: {
    width: "23%",
    height: 30,
    borderWidth: 0.5,
    borderColor: "#3186FF",
    borderRadius: 20
  },
  textkcal: {
    fontWeight: "bold",
    color: "gray",
    fontSize: 16,
    fontFamily: 'Athiti',
    textAlign: "center"
  },
  line: {
    marginTop: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  containerimageate: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-around',
    margin: 2
  },
  containerate: {
    flexDirection: "row",
    flex: 1,
    justifyContent: 'space-around',
    marginHorizontal: 5,
    alignItems: "center"
  },
  containerkcal: {
    flexDirection: "row",
    flex: 1,
    justifyContent: 'space-around'
  }

});

export default Newsfeed;
