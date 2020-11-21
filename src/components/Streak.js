import React from "react";
import { View, Text,  StyleSheet,  Image } from 'react-native';


const Streak = () =>  {

    return (
        <View style={styles.container}>
        <View style={{alignItems:"center", backgroundColor:"#D7385E", borderRadius:20, width:200, height:150}}>
        <View style={{alignItems:"center", backgroundColor:"#E55275", borderRadius:20, width:200, height:35 ,flexDirection:"row", justifyContent:"center"}}>
            <Text style={{alignItems:"center", color:"white", fontFamily:"Athiti", fontSize:"18px", fontWeight:"bold", marginTop:2 }}>Streak</Text>
            <Image source={{uri: "https://img.icons8.com/fluent/48/000000/fire-element.png"}} style={{width:30, height:30}}></Image>
            </View>
            <View style={{flexDirection:"column", flex:1}}>
        <Text style={{alignItems:"center", color:"white", fontFamily:"Athiti" , fontWeight:"bold", fontSize:55}}>32</Text>
        
        </View>
        <Text style={{marginBottom:50, color:"white", fontFamily:"Athiti", fontSize:23, fontWeight:"bold", marginTop:70}}>Days</Text>
        </View>
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      textAlign: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
    },

  });



  export default Streak;



