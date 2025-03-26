import React from "react";
import { View, StyleSheet } from "react-native";
import NumberBox from "./molecules/NumberBox";

const PaceRow = ({ minutes, seconds, onChangeText, onFocus, onBlur, lockedField }) => {
  return (
    <View style={styles.container}>
      <NumberBox
        value={minutes}
        onChangeText={(m) => onChangeText('paceMinutes', m)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={lockedField ? '' : '0'}
        label='minutos'
      />
      <View style={styles.dotsContainer}>
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      <NumberBox
        value={seconds}
        onChangeText={(s) => onChangeText('paceSeconds', s)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={lockedField ? '' : '0'}
        label='segundos'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dotsContainer: {
    justifyContent: 'center',
    marginBottom: 12,
  },
  dot: { 
    height: 8,
    width: 8,
    backgroundColor: 'grey',
    borderRadius: 28,
    marginHorizontal: 4,
    marginVertical: 12,
  },
});


export default PaceRow;
