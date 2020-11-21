import React from "react";
import { View, Text, TextInput, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';


const Login = () =>  {

    return (
    <ImageBackground source={{uri: "https://sv1.picz.in.th/images/2020/10/22/bBmjkI.jpg"}} style={{  opacity:1,width:"100%" , height:"100%"}}>
        <View style={{marginTop:30,alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{justifyContent:"center", fontSize:"30px" , color:"white", fontFamily: 'Athiti'}}>Eatout</Text>
        <View style={{borderBottomColor: 'white',borderBottomWidth: 1, width:"100%",marginBottom:10, opacity:0.3}}/>
        <View style={{alignItems: 'left', justifyContent:"left", borderBottomColor: 'white',borderBottomWidth: 1, width:"80%", opacity:0.3}}/>
        </View>
      <View style={styles.container}>
        <Text style={{justifyContent:"center", fontSize:"40px", marginBottom:30 , color:"white", fontFamily: 'Athiti'}}> Welcome !! </Text>
        <View style={{flexDirection: 'row'}}>
        <Text style={{fontWeight:"bold", color:"white", fontSize:"18px", verticalAlign: "middle" ,fontFamily: 'Athiti'}}> Username </Text>
        <TextInput paddingLeft={20}
      style={{ marginLeft: 15, width: 200, height:35, boxShadow: "5px 5px 10px #3B3B3B" , backgroundColor:"white", borderRadius:20 }}

    />
        </View>
        <View style={{flexDirection: 'row', marginTop:10}}>
        <Text style={{fontWeight:"bold", color:"white", fontSize:"18px", verticalAlign: "middle" , fontFamily: 'Athiti'}}> Password </Text>
        <TextInput secureTextEntry={true} paddingLeft={20}
      style={{ marginLeft: 15, width: 200, height:35,boxShadow: "5px 5px 10px #3B3B3B" , backgroundColor:"white", borderRadius:20}}

    />
        </View>
        <TouchableOpacity style={{backgroundColor:"#5B9153", width:200, height:50, marginTop:10,alignItems: "center",  
        borderRadius:20, verticalAlign: "middle"}}>
          <Text style={{justifyContent:"center", fontSize:"20px", color:"white", padding:11, fontFamily: 'Athiti'}}>Login</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', marginTop:10}}>
          <Text style={{color:"white", fontFamily: 'Athiti'}}>Don't have account ?    </Text>
          <Text style={{color:"white", fontFamily: 'Athiti', fontSize:"16px", fontWeight:"bold"}}>Sign Up</Text>
          </View>
      </View>
      </ImageBackground>      
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

  });



  export default Login;



