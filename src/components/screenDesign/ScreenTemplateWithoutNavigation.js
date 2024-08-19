import React from 'react';
import { View } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { statusBarHeight } from '../../config';

const ScreenTemplateWithoutNavigation = ({ children, headerTitle, onBackPress, footerText, onFooterPress, hideHeader, hideFooter, footerDisabled}) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#1a1a2e', paddingTop: statusBarHeight }}>
      {!hideHeader && <Header title={headerTitle} onBackPress={onBackPress} />}
      
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        {children}
      </View>
      {!hideFooter && <Footer buttonText={footerText} onPress={onFooterPress} footerDisabled={footerDisabled}/>}
    </View>
  );
};

export default ScreenTemplateWithoutNavigation;
