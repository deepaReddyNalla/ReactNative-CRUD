/* eslint-disable prettier/prettier */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';

import {navigationRef} from './rootNavigation';
import AddUsers from '../Routes/AddUsers';
import UserList from '../Routes/UserList';
import UpdateData from '../Routes/UpdateData';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  // eslint-disable-next-line prettier/prettier
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="AddUsers" component={AddUsers} />
        <Stack.Screen name="UserList" component={UserList} />
        <Stack.Screen name="UpdateData" component={UpdateData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
