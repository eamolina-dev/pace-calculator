import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FieldScreen from '../screens/FieldScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: 'fade',  // Otras opciones: 'slide_from_right', 'slide_from_left', 'slide_from_bottom', 'fade_from_bottom'
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home', headerShown: false }} />
        <Stack.Screen name="Field" component={FieldScreen} options={{ title: 'Field', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
