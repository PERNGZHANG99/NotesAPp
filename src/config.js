import { StatusBar, Platform } from 'react-native';

export const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 20;
