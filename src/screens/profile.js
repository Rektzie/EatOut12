import React, { useRef } from "react";
import { Animated, StyleSheet, Text, View, Image } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';
const ProfileScreen = () => {

  return (
    <View style={{ flex: 1 }}>


      <View style={{ justifyContent: "center", alignItems: "center", flex: 1}}>

        <Image style={{ width: 150, height: 150, }}

          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <MaterialIcons name="edit" size={25} color="gray" style={{ marginRight: 5 }} />
          <Text style={{ marginRight: 20, marginTop: 5, fontWeight: "bold", color: "#707070", fontSize: 18, verticalAlign: "middle", fontFamily: 'Athiti' }}>Edit Profile</Text>

        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", marginTop: 10, }}>
          <Text style={{ marginTop: 5, marginLeft: 20, fontWeight: "bold", color: "#707070", fontSize: 18, verticalAlign: "middle", fontFamily: 'Athiti' }}>Name</Text>
          <TextInput paddingLeft={20} style={{ marginLeft: 20, width: "52%", height: 30, borderWidth: 0.5, borderColor: "#3186FF", borderRadius: 20 }}></TextInput>
        </View>

        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Text style={{ marginTop: 5, marginLeft: 20, fontWeight: "bold", color: "#707070", fontSize: 18, verticalAlign: "middle", fontFamily: 'Athiti' }}>Email</Text>
          <TextInput paddingLeft={20} style={{ marginLeft: 20, width: "52%", height: 30, borderWidth: 0.5, borderColor: "#3186FF", borderRadius: 20 }}></TextInput>
        </View>

        <View
          style={{
            marginTop: 20,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />


        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginTop: 23, marginLeft: 20, fontWeight: "bold", color: "#707070", fontSize: 18, verticalAlign: "middle", fontFamily: 'Athiti' }}>Age</Text>
          <TextInput paddingLeft={20} style={{ marginTop: 20, marginLeft: 32, width: "25%", height: 30, borderWidth: 0.5, borderColor: "#3186FF", borderRadius: 20 }}></TextInput>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginLeft: 20, marginRight: 15, marginTop: 23, fontWeight: "bold", color: "#707070", fontSize: 18, verticalAlign: "middle", fontFamily: 'Athiti' }}>BMI</Text>
            <TextInput paddingLeft={20} style={{ marginLeft: 20, marginTop: 20, width: "42%", height: 30, borderWidth: 0.5, borderColor: "#3186FF", borderRadius: 20 }}></TextInput>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginTop: 23, marginLeft: 20, fontWeight: "bold", color: "#707070", fontSize: 18, verticalAlign: "middle", fontFamily: 'Athiti' }}>Weight</Text>
          <TextInput paddingLeft={20} style={{ marginTop: 20, marginLeft: 8, width: "25%", height: 30, borderWidth: 0.5, borderColor: "#3186FF", borderRadius: 20 }}></TextInput>

          <Text style={{ marginLeft: 18, marginRight: 15, marginTop: 23, fontWeight: "bold", color: "#707070", fontSize: 18, verticalAlign: "middle", fontFamily: 'Athiti' }}>Height</Text>
          <TextInput editable={false} selectTextOnFocus={false} onEndEditing={false} paddingLeft={20} style={{ marginTop: 20, width: "25%", height: 30, borderWidth: 0.5, borderColor: "#3186FF", borderRadius: 20 }}></TextInput>
        </View>

        <View
          style={{
            marginTop: 20,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />

        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginTop: 23, marginLeft: 20, fontWeight: "bold", color: "#707070", fontSize: 18, verticalAlign: "middle", fontFamily: 'Athiti' }}>Goal Reached Streak</Text>
          <TextInput paddingLeft={20} style={{ marginTop: 20, marginLeft: 32, width: "25%", height: 30, borderWidth: 0.5, borderColor: "#3186FF", borderRadius: 20 }}><Text>5</Text></TextInput>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1, marginTop: 20 }}>
          <TouchableOpacity style={{ alignSelf: 'flex-end', alignItems: "center", justifyContent: "center", borderRadius: 18, width: 150, height: 50, backgroundColor: "#585858" }}><Text style={{ fontWeight: "bold", color: "white", fontSize: 18, verticalAlign: "middle", fontFamily: 'Athiti' }}>Logout</Text></TouchableOpacity>
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
    justifyContent: "flex-end",
  },

});

export default ProfileScreen;
