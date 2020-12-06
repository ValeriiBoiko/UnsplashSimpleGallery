import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { Provider } from 'react-redux';
import Gallery from '../screens/Gallery';
import Photo from '../screens/Photo';
import store from '../store';

enableScreens();
const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Gallery' component={Gallery} />
          <Stack.Screen name='Photo' component={Photo} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default RootNavigator;
