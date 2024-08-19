import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/Home';
import NoteScreen from '../screens/Note/Note';
import SummaryScreen from '../screens/Summary';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'New') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Summary') {
            iconName = focused ? 'list' : 'list-outline';
          }

          // Make the "New" icon larger
          if (route.name === 'New') {
            size = 36;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff4081',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { backgroundColor: '#1a1a2e' },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="New" 
        component={NoteScreen}
        options={{
          tabBarLabel: '', // Remove the label for the "New" tab
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                // Navigate to the Note screen with isNew: true
                navigation.navigate('Note', { isNew: true });
              }}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Summary" 
        component={SummaryScreen} 
        options={{
          tabBarLabel: 'Summary',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
