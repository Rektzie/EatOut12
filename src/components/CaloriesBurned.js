import React from "react";
import { View, Picker, Text, StyleSheet } from 'react-native';


const CaloriesBurned = () => {

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", backgroundColor: "#3186FF", borderRadius: 20, width: 200, height: 150 }}>
        <View style={{ alignItems: "center", backgroundColor: "#0069FF", borderRadius: 20, width: 200, height: 35 }}>
          <Text style={{ alignItems: "center", color: "white", fontFamily: "Athiti", fontSize: "18px", fontWeight: "bold", marginTop: 2 }}>Calories Burned</Text>
        </View>
        <Picker
          style={{ height: 30, width: 180, marginTop: 10, borderRadius: 20 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Today" value="Today" style={{ textAlign: 'center', alignItems: "center", borderRadius: 20 }} />
          <Picker.Item label="This Week" value="This Week" style={{ textAlign: 'center', alignItems: "center", borderRadius: 20 }} />
        </Picker>
        <Text style={{ alignItems: "center", color: "white", fontFamily: "Athiti", fontSize: "26px", marginTop: 15 }}>14032 Kcal</Text>
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



export default CaloriesBurned;



