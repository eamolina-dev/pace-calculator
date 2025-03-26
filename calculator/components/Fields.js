import React from "react";
import { View, StyleSheet } from "react-native";
import Options from "./molecules/Options";
import DistanceRow from "../components/DistanceRow";
import TimeRow from "../components/TimeRow";
import PaceRow from "../components/PaceRow";
import { Colors } from "../lib/constants/colors";
import FieldLabel from "./atoms/FieldLabel";

export const DistanceField = ({ rowStyle, km, meters, onChangeText, fillBox, onFocus, onBlur, lockedField }) => {
  return (
    <View style={rowStyle}>
      <FieldLabel label='Distancia' />
      <DistanceRow
        km={km}
        meters={meters}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        lockedField={lockedField}
      />
      <Options
        option1='5k'
        option2='10k'
        option3='21k'
        option4='42k'
        fillBox={fillBox}
      />
    </View>
  );
};

export const TimeField = ({ rowStyle, hours, minutes, seconds, onChangeText, fillBox, onFocus, onBlur, lockedField }) => {
  return (
    <View style={rowStyle}>
      <FieldLabel label='Tiempo' />
      <TimeRow
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        lockedField={lockedField}
      />
      <Options
        option1='10m'
        option2='30m'
        option3='1h'
        option4='2h'
        fillBox={fillBox}
      />
    </View>
  );
};

export const PaceField = ({ rowStyle, paceMinutes, paceSeconds, onChangeText, fillBox, onFocus, onBlur, lockedField }) => {
  return (
    <View style={rowStyle}>
      <FieldLabel label='Ritmo' />
      <PaceRow
        minutes={paceMinutes}
        seconds={paceSeconds}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        lockedField={lockedField}
      />
      <Options
        option1='3m/km'
        option2='4m/km'
        option3='5m/km'
        option4='6m/km'
        fillBox={fillBox}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    backgroundColor: 'black',
  },
  rows: {
    flex: 16,
  },
  row: {
    flex: 1,
  },
  activeRow: {
    flex: 1,
    marginTop: 100,
  },
  buttons: {
    flex: 3,
  },
  activeButtons: {
    flex: 5,
  },
  footer: {
    flex: 1,
    backgroundColor: 'black',
  },
  label: {
    color: 'white',
  },
  input: {
    backgroundColor: '#D9D9D9',
    color: '#262626',
    height: 140,
    width: 120,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 40,
    fontFamily: 'Orbitron',
    borderRadius: 12,
  },
  lockedRow: {
    backgroundColor: 'grey'
  }
});