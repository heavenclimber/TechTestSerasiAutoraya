import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import List from '../components/List';
import Detail from './Detail';

import React from 'react';



function Route() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: 'red',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="Now Showing"
          component={List}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: 'red',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="Movie Detail"
          component={Detail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Route;
