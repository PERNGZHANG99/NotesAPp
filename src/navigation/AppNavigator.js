import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import SettingsScreen from '../screens/Settings/Settings';
import CategoryManagementScreen from '../screens/Settings/CategoryManagement';
import FullCategoryNotesScreen from '../screens/Note/FullCategoryNotes';
import NoteScreen from '../screens/Note/Note';
import UserAgreement from '../screens/Settings/UserAgreement'; 
import PrivacyPolicy from '../screens/Settings/PrivacyPolicy';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <>
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="CategoryManagement" component={CategoryManagementScreen} />
      <Stack.Screen name="FullCategoryNotes" component={FullCategoryNotesScreen} />
      <Stack.Screen name="Note" component={NoteScreen} />
      <Stack.Screen name="UserAgreement" component={UserAgreement} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} /> 
    </>
  </Stack.Navigator>
  );
};

export default AppNavigator;
