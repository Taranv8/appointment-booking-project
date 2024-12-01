import React from 'react';
import { StatusBar, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './components/patient/Welcomescreen';
import Login from './components/patient/Login'; // Assuming Login is in the same folder

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Adjust StatusBar for grey background */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Platform.OS === 'android' ? 'grey' : 'transparent'}
        translucent={Platform.OS === 'android'}
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure it fills the entire screen
    backgroundColor: '#fff', // Match the app's intended background color
  },
});
