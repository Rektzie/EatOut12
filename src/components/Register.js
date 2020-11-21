import React from "react";
import { View, Text,TextInput, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';


const Register = () => {

    return (
        <ImageBackground source={{ uri: "https://sv1.picz.in.th/images/2020/10/22/bBmjkI.jpg" }} style={{ opacity: 1, width: "100%", height: "100%" }}>
            <View style={{ marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ justifyContent: "center", fontSize: "30px", color: "white", fontFamily: 'Athiti' }}>Eatout</Text>
                <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, width: "100%", marginBottom: 10, opacity: 0.3 }} />
                <View style={{ alignItems: 'left', justifyContent: "left", borderBottomColor: 'white', borderBottomWidth: 1, width: "80%", opacity: 0.3 }} />
            </View>
            <View style={styles.container}>
                <Text style={{ alignItems:"center",  fontSize: "40px", marginBottom: 30, color: "white", fontFamily: 'Athiti' }}> Sign Up </Text>
                
                <View style={{disPlay: "inline-block" , alignItems:"center"}}>
                <View style={{ flexDirection: 'row'}}>
                    <Text style={{ marginRight:18, alignItems: "left" , fontWeight: "bold", color: "white", fontSize: "18px", verticalAlign: "middle", fontFamily: 'Athiti' }}>Username </Text>
                    <TextInput paddingLeft={20}
                        style={{ marginLeft: 15, width: 200, height: 30, boxShadow: "5px 5px 10px #3B3B3B", backgroundColor: "white", borderRadius: 20 }}

                    />
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ marginRight:54, alignItems: "left",fontWeight: "bold", color: "white", fontSize: "18px", verticalAlign: "middle", fontFamily: 'Athiti' }}>Name </Text>
                    <TextInput paddingLeft={20}
                        style={{ marginLeft: 15, width: 200, height: 35, boxShadow: "5px 5px 10px #3B3B3B", backgroundColor: "white", borderRadius: 20 }}

                    />
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ marginRight:60, alignItems: "left",fontWeight: "bold", color: "white", fontSize: "18px", verticalAlign: "middle", fontFamily: 'Athiti' }}> Email </Text>
                    <TextInput paddingLeft={20}
                        style={{ marginLeft: 15, width: 200, height: 35, boxShadow: "5px 5px 10px #3B3B3B", backgroundColor: "white", borderRadius: 20 }}

                    />
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ marginRight:30,alignItems: "left",fontWeight: "bold", color: "white", fontSize: "18px", verticalAlign: "middle", fontFamily: 'Athiti' }}> Password </Text>
                    <TextInput secureTextEntry={true} paddingLeft={20}
                        style={{ marginLeft: 15, width: 200, height: 35, boxShadow: "5px 5px 10px #3B3B3B", backgroundColor: "white", borderRadius: 20 }}

                    />
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ alignItems: "left",fontWeight: "bold", color: "white", fontSize: "18px", verticalAlign: "middle", fontFamily: 'Athiti' }}> Re-Password </Text>
                    <TextInput secureTextEntry={true} paddingLeft={20}
                        style={{ marginLeft: 15, width: 200, height: 35, boxShadow: "5px 5px 10px #3B3B3B", backgroundColor: "white", borderRadius: 20 }}

                    />
                </View>
                </View>

                <TouchableOpacity style={{
                    backgroundColor: "#3186FF", width: 200, height: 50, marginTop: 10, alignItems: "center",
                    borderRadius: 20, verticalAlign: "middle"
                }}>
                    <Text style={{ justifyContent: "center", fontSize: "20px", color: "white", padding: 11, fontFamily: 'Athiti' }}>Create Account</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ color: "white", fontFamily: 'Athiti' }}>Already have an account ?    </Text>
                    <Text style={{ color: "white", fontFamily: 'Athiti', fontSize: "16px", fontWeight: "bold" }}>Sign In</Text>
                </View>
            </View>
        </ImageBackground>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        justifyContent: 'center',
    },

});



export default Register;



