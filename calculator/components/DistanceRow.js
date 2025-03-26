import React from "react";
import { View, StyleSheet} from "react-native";
import NumberBox from "./molecules/NumberBox";

const DistanceRow = ({ km, meters, onChangeText, onFocus, onBlur, lockedField }) => {
  return (
    <View style={styles.container}>
      <NumberBox
        value={km}
        onChangeText={(k) => onChangeText('km', k)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={lockedField ? '' : '0'}
        label='kilometros'
      />
      <View style={styles.dotContainer}>
        <View style={styles.dot} />
      </View>
      <NumberBox
        value={meters}
        onChangeText={(m) => onChangeText('meters', m)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={lockedField ? '' : '0'}
        label='metros'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dotContainer: {
    justifyContent: 'flex-end',
    marginBottom: 28,
  },
  dot: { 
    height: 8,
    width: 8,
    backgroundColor: 'grey',
    borderRadius: 28,
    marginHorizontal: 4,
  },
});

export default DistanceRow;
