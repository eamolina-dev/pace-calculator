import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Colors } from "../../lib/constants/colors";

const NumberBox = ({ value, onChangeText, onFocus, onBlur, placeholder, label }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor='#8C8B8C'
        keyboardType="numeric"
        style={styles.textInput}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: Colors.darkblue,
    height: 120,
    width: 120,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 12,
    fontSize: 40,
    fontFamily: 'Orbitron',
    color: Colors.lightgrey,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Orbitron',
    color: Colors.brown,
  }
});

export default NumberBox;
