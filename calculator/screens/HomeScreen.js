import React, { useState, useEffect } from "react";
import { View, StyleSheet, KeyboardAvoidingView, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Buttons from "../components/molecules/Buttons";
import { Colors } from "../lib/constants/colors";
import { DistanceField, TimeField, PaceField } from "../components/Fields";
import {
  getDistanceInKm, getTimeInMinutes, getPace,
  calculatePace, calculateDistance, calculateTime,
  getPaceMinutes, getPaceSeconds,
  getTimeHours, getTimeMinutes, getTimeSeconds,
  getDistanceKm, getDistanceMeters
} from '../lib/helpers/calculation';
import { fieldMap, optionsMap } from '../lib/helpers/maps';

SplashScreen.preventAutoHideAsync();

const HomeScreen = () => {
  const [loaded, error] = useFonts({
    'Russo-One': require('../assets/fonts/RussoOne-Regular.ttf'),
    'Quantico': require('../assets/fonts/Quantico-Bold.ttf'),
    'Orbitron': require('../assets/fonts/Orbitron.ttf'),
    'Tektur': require('../assets/fonts/Tektur.ttf'),
  });

  const [km, setKm] = useState('');
  const [meters, setMeters] = useState('');

  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const [paceMinutes, setPaceMinutes] = useState('');
  const [paceSeconds, setPaceSeconds] = useState('');

  const [editableFields, setEditableFields] = useState([]);
  const [lockedField, setLockedField] = useState(null);
  const [isLowerInputFocused, setIsLowerInputFocused] = useState(false);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  
  // Main function
  const calculate = () => {
    const dist = getDistanceInKm(km, meters);
    const t = getTimeInMinutes(hours, minutes, seconds);
    const p = getPace(paceMinutes, paceSeconds);

    if (lockedField === 'pace' && dist > 0 && t > 0) {
      const totalPace = calculatePace(t, dist);
      setPaceMinutes(getPaceMinutes(totalPace).toString());
      setPaceSeconds(getPaceSeconds(totalPace).toString());
    } else if (lockedField === 'time' && dist > 0 && p > 0) {
      const totalTime = calculateTime(dist, p);
      setHours(getTimeHours(totalTime).toString());
      setMinutes(getTimeMinutes(totalTime).toString());
      setSeconds(getTimeSeconds(totalTime).toString());
    } else if (lockedField === 'distance' && t > 0 && p > 0) {
      const totalDistance = calculateDistance(t, p);
      setKm(getDistanceKm(totalDistance).toString());
      setMeters(getDistanceMeters(totalDistance).toString());
    }
  };
  
  const removeAll = () => {
    setKm('');
    setMeters('');

    setHours('');
    setMinutes('');
    setSeconds('');
    
    setPaceMinutes('');
    setPaceSeconds('');
    
    setEditableFields([]);
    setLockedField('');
  };

  const lockField = (unit) => {
    const field = fieldMap[unit];

    if (!editableFields.includes(field)) {
      const newEditableFields = [...editableFields, field];

      if (newEditableFields.length === 2) {
        const locked = ["distance", "time", "pace"].find(f => !newEditableFields.includes(f));
        setLockedField(locked);
      }

      setEditableFields(newEditableFields);
    }
  };

  const setUnit = (unit, value) => {
    switch (unit) {
      case 'km': setKm(value); break;
      case 'meters': setMeters(value); break;
      case 'hours': setHours(value); break;
      case 'minutes': setMinutes(value); break;
      case 'seconds': setSeconds(value); break;
      case 'paceMinutes': setPaceMinutes(value); break;
      case 'paceSeconds': setPaceSeconds(value); break;
      default: break;
    }
  }

  const handleOnChangeText = (unit, value) => {
    lockField(unit);
    setUnit(unit, value);
  };

  const handleOnFocus = (field) => {
    if (field === 'distance') {
      setIsLowerInputFocused(false);
    } else {
      setIsLowerInputFocused(true);
    }
  };

  const handleOnBlur = () => {
    setIsLowerInputFocused(false);
  };
  
  const fillBox = (value) => {
    const config = optionsMap[value];
    if (!config) {
      console.log('Invalid unit');
      return;
    }
  
    const { field, ...units } = config;
  
    if (field === lockedField) return;
  
    lockField(field);
  
    Object.entries(units).forEach(([unit, amount]) => setUnit(unit, amount));
  };  

  const FieldWrapper = ({ field, children }) => (
    <View
      pointerEvents="box-none"
      style={[
        styles.row,
        { backgroundColor: lockedField === field ? 'grey' : null },
      ]}
    >
      {React.cloneElement(children, {
        onChangeText: handleOnChangeText,
        onFocus: () => handleOnFocus(field),
        onBlur: handleOnBlur,
        fillBox,
        editable: lockedField !== field,
        lockedField: lockedField === field,
      })}
    </View>
  );

  return (
    // <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior='height'
        enabled={false}
        keyboardVerticalOffset={0}
        style={styles.container}
      >
        <View style={styles.scrollView}>
          <FieldWrapper field="distance">
            <DistanceField km={km} meters={meters} />
          </FieldWrapper>

          <FieldWrapper field="time">
            <TimeField hours={hours} minutes={minutes} seconds={seconds} />
          </FieldWrapper>

          <FieldWrapper field="pace">
            <PaceField paceMinutes={paceMinutes} paceSeconds={paceSeconds} />
          </FieldWrapper>  

          {/* { (activeField === null) && */}
            <View style={styles.buttons}>
              <Buttons 
                title1={'Calcular'}
                onPress1={calculate}
                title2={'Borrar'}
                onPress2={removeAll}
              />
            </View>
          {/* } */}
        </View>
      </KeyboardAvoidingView>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: Colors.lightgrey,
    fontSize: 16,
  },
  container: {
    height: '100%',
    justifyContent: 'center',
    backgroundColor: Colors.white
  },
  rows: {
    flex: 1,
  },
  row: {
    alignSelf: 'stretch',
    paddingVertical: 16,
  },
  activeRow: {
    flex: 1,
    marginTop: 100,
  },
  buttons: {
    height: 140,
  },
  activeButtons: {
    flex: 5,
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
  label: {
    fontSize: 24,
    fontFamily: 'Orbitron',
    color: '#262626',
    paddingLeft: 20,
  },
  divider: {
    height: 2,
    width: '100%',
    marginLeft: 10,
    backgroundColor: '#D06725'
  },
  divider2: {
    height: 2,
    width: 80,
    alignSelf: 'center',
    marginLeft: 20,
    backgroundColor: '#D06725',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  lockedRow: {
    backgroundColor: 'grey'
  },
  textInput: {
    backgroundColor: Colors.lightgrey,
    height: 120,
    width: 120,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 12,
    fontSize: 40,
    fontFamily: 'Orbitron',
    color: Colors.black,
  },
});

export default HomeScreen;
