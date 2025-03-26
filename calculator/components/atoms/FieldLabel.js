import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../lib/constants/colors";

const FieldLabel = ({ label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 24,
    fontFamily: 'Russo-One',
    color: Colors.darkblue,
    paddingLeft: 20,
  },
  divider: {
    height: 2,
    flex: 1,
    marginLeft: 10,
    marginRight: 20,
    backgroundColor: '#D06725',
  },
});

export default FieldLabel;
