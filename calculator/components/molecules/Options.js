import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TapArea from "../atoms/TapArea";
import { Colors } from "../../lib/constants/colors";

const Options = ({ option1, option2, option3, option4, fillBox }) => {
  return (
    <View style={styles.options}>
      <TapArea
        onPress={() => fillBox(option1)}
        style={styles.distance}
      >
        <Text style={styles.option}>{option1}</Text>
      </TapArea>
      <TapArea
        onPress={() => fillBox(option2)}
        style={styles.distance}
      >
        <Text style={styles.option}>{option2}</Text>
      </TapArea>
      <TapArea
        onPress={() => fillBox(option3)}
        style={styles.distance}
      >
        <Text style={styles.option}>{option3}</Text>
      </TapArea>
      <TapArea
        onPress={() => fillBox(option4)}
        style={styles.distance}
      >
        <Text style={styles.option}>{option4}</Text>
      </TapArea>
    </View>
  );
};

const styles = StyleSheet.create({
  options: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  option: {
    fontSize: 12,
    color: Colors.lightgrey,
  },
  distance: {
    height: 24,
    width: 56,
    backgroundColor: 'grey',
    borderRadius: 24,
    marginHorizontal: 16,
  },
  divider: {
    height: 2,
    width: 400,
    alignSelf: 'center',
    backgroundColor: Colors.brown,
  },
});

export default Options;