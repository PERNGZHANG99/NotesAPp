import React from 'react';
import { View, ScrollView, StatusBar, Platform } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { statusBarHeight } from '../../config';


const ScreenTemplateWithNavigation = ({ children}) => {

  return (
    <View style={{ flex: 1, backgroundColor: '#1a1a2e', paddingTop: statusBarHeight }}>
       {children}
    </View>
  );
};

export default ScreenTemplateWithNavigation;
