import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TapArea from "../atoms/TapArea";
import { Colors } from "../../lib/constants/colors";

const Buttons = ({ title1, onPress1, title2, onPress2 }) => {
  return (
    <View style={styles.container}>
      <TapArea 
        onPress={onPress1}
        style={[styles.button, { borderColor: '#1565C0' }]}
      >
        <Text style={styles.text}>{title1}</Text>
      </TapArea>
      <TapArea 
        onPress={onPress2}
        style={[styles.button, { borderColor: '#b92b27' }]}
      >
        <Text style={styles.text}>{title2}</Text>
      </TapArea>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  button: {
    height: 50,
    width: 420,
    borderRadius: 12,
    backgroundColor: Colors.lightgrey,
    borderWidth: 3,
  },
  text: {
    fontFamily: 'Quantico',
    fontSize: 20,
  }
});

export default Buttons;
