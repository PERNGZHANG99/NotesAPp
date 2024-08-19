import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { initializeDefaultCategories } from './src/utils/categoryStorage';
import { initializeIcons } from './src/utils/iconStorage';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize default categories and icons on app launch
    const initApp = async () => {
      await initializeDefaultCategories();
      await initializeIcons();
      setIsInitialized(true); // Set this to true once initialization is complete
    };
    initApp();
  }, []);

  if (!isInitialized) {
    // Show a loading indicator while the app is initializing
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
