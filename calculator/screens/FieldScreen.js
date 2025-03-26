import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Keyboard } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Options from "../components/Options";
import Buttons from "../components/Buttons";
import DistanceRow from "../components/DistanceRow";
import TimeRow from "../components/TimeRow";
import PaceRow from "../components/PaceRow";
import { Colors } from "../constants/colors";
import { DistanceField, TimeField, PaceField } from '../components/Fields';
import { useRoute, useNavigation } from '@react-navigation/native';

SplashScreen.preventAutoHideAsync();

const FieldScreen = () => {
  const [loaded, error] = useFonts({
    'Russo-One': require('../assets/fonts/RussoOne-Regular.ttf'),
    'Quantico': require('../assets/fonts/Quantico-Bold.ttf'),
    'Orbitron': require('../assets/fonts/Orbitron.ttf'),
    'Tektur': require('../assets/fonts/Tektur.ttf'),
  });

  const route = useRoute();
  const navigation = useNavigation();
  const { activeField } = route.params;

  console.log(activeField);

  const [km, setKm] = useState('');
  const [meters, setMeters] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [paceMinutes, setPaceMinutes] = useState('');
  const [paceSeconds, setPaceSeconds] = useState('');
  const [editableFields, setEditableFields] = useState([]);
  const [lockedField, setLockedField] = useState(null);
  const [activeInput, setActiveInput] = useState(null);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  // useEffect(() => {
  //   console.log(activeInput);
  // }, [activeInput]);

  const getDistance = () => {
    return (parseFloat(km) || 0) + (parseFloat(meters) || 0) / 1000;
  };

  const getTime = () => {
    return (
      (parseFloat(hours) || 0) * 3600 +
      (parseFloat(minutes) || 0) * 60 +
      (parseFloat(seconds) || 0)
    );
  };

  const getPace = () => {
    return (
      (parseFloat(paceMinutes) || 0) * 60 +
      (parseFloat(paceSeconds) || 0)
    );
  };

  const calculate = () => {
    const dist = getDistance();
    const t = getTime();
    const p = getPace();

    if (lockedField === 'pace') {
      // Calcula ritmo
      const totalPace = t / dist;
      setPaceMinutes(Math.floor(totalPace / 60).toString());
      setPaceSeconds(Math.floor(totalPace % 60).toString());
    } else if (lockedField === 'time') {
      // Calcula tiempo
      const totalTime = dist * p;
      setHours(Math.floor(totalTime / 3600).toString());
      setMinutes(Math.floor((totalTime % 3600) / 60).toString());
      setSeconds(Math.floor(totalTime % 60).toString());
    } else if (lockedField === 'distance') {
      // Calcula distancia
      const totalDistance = t / p;
      setKm(Math.floor(totalDistance).toString());
      setMeters(Math.floor((totalDistance % 1) * 1000).toString());
    } // else {
    //   Alert.alert("Error", "Debes ingresar dos parámetros para calcular el tercero.");
    // }
  };

  const done = () => {
    Keyboard.dismiss();
    setActiveInput(null);
  };

  const back = () => {
    Keyboard.dismiss();
    setActiveInput(null);
    // remove units from section 
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
    setActiveInput(null);
  };

  const fieldMap = {
    km: "distance",
    meters: "distance",
    hours: "time",
    minutes: "time",
    seconds: "time",
    paceminutes: "pace",
    paceseconds: "pace",
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

  const handleInputChange = (unit, value) => {
    lockField(unit);
    setUnit(unit, value);
    calculate();
  };

  const fillBox = (unit, value) => {
    if ((unit === 'km' || unit === 'meters') && lockedField === 'distance') return;
    if ((unit === 'hours' || unit === 'minutes' || unit === 'seconds') && lockedField === 'time') return;
    if ((unit === 'paceMinutes' || unit === 'paceSeconds') && lockedField === 'pace') return;

    if (unit === 'km') {
      lockField('km');

      if (value === '5') {
        setUnit('km', '5');
        setUnit('meters', '0');
      } else if (value === '10') {
        setUnit('km', '10');
        setUnit('meters', '0');
      } else if (value === '21') {
        setUnit('km', '21');
        setUnit('meters', '97');
      } else if (value === '42') {
        setUnit('km', '42');
        setUnit('meters', '195');
      }
    } else if (unit === 'time') {
      lockField('time');

      if (value === '10') {
        setUnit('hours', '0');
        setUnit('minutes', '10');
        setUnit('seconds', '0');
      } else if (value === '30') {
        setUnit('hours', '0');
        setUnit('minutes', '30');
        setUnit('seconds', '0');
      } else if (value === '1') {
        setUnit('hours', '1');
        setUnit('minutes', '0');
        setUnit('seconds', '0');
      } else if (value === '2') {
        setUnit('hours', '2');
        setUnit('minutes', '0');
        setUnit('seconds', '0');
      }
    } else if (unit === 'pace') {
      lockField('paceMinutes');

      if (value === '3') {
        setUnit('paceMinutes', '3');
        setUnit('paceSeconds', '0');
      } else if (value === '4') {
        setUnit('paceMinutes', '4');
        setUnit('paceSeconds', '0');
      } else if (value === '5') {
        setUnit('paceMinutes', '5');
        setUnit('paceSeconds', '0');
      } else if (value === '2') {
        setUnit('paceMinutes', '6');
        setUnit('paceSeconds', '0');
      }
    } else {
      console.log('Invalid unit');
    }
  };  

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.header} />
        <View style={styles.rows}>
          
          { activeField === 'distance' && 
            <DistanceField 
              km={km}
              meters={meters}
              handleInputChange={handleInputChange}
              onPress={() => handlePress('distance')}
              allowEditing={true}
            />
          }

          { activeField === 'time' && 
            <TimeField 
              hours={hours}
              minutes={minutes}
              seconds={seconds}
              handleInputChange={handleInputChange}
              onPress={() => handlePress('time')}
              allowEditing={true}
            />
          }
          
          { activeField === 'pace' && 
            <PaceField 
              paceMinutes={paceMinutes}
              paceSeconds={paceSeconds}
              handleInputChange={handleInputChange}
              onPress={() => handlePress('pace')}
              allowEditing={true}
            />
          }
          
        </View>
        <View style={styles.activeButtons}>
          <Buttons 
            title1={'Listo'}
            onPress1={done}
            title2={'Cancelar'}
            onPress2={back}
          />
        </View>
        <View style={styles.footer} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    // height: 700,
    justifyContent: 'center',
    // alignItems: 'stretch',
    // backgroundColor: '#333',
    // borderRadius: 10,
    // paddingHorizontal: 12,
  },
  header: {
    flex: 1,
    backgroundColor: 'black',
  },
  rows: {
    flex: 16,
    // backgroundColor: 'red'
  },
  row: {
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // backgroundColor: 'red'
  },
  activeRow: {
    flex: 1,
    // justifyContent: 'center',
    marginTop: 100,
    // backgroundColor: Colors.lightgrey,
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
    // marginBottom: 5,
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
  labelStyle: {
    // paddingLeft: 90,
  },
  label: {
    fontSize: 24,
    fontFamily: 'Orbitron',
    color: '#262626',
    paddingLeft: 20,
  },
  divider: {
    height: 2,
    // alignSelf: 'stretch',
    width: '100%',
    marginLeft: 10,
    backgroundColor: '#D06725',
    // paddingRight: 40,
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
    // justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 40,
    // backgroundColor: 'green',
    marginBottom: 6,
  },
  lockedRow: {
    backgroundColor: 'grey'
  }
});

export default FieldScreen;
