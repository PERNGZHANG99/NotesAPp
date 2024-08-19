import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const Footer = ({ buttonText, onPress, footerDisabled = false }) => {
  return (
    <View style={{
      padding: 16,
      backgroundColor: '#1a1a2e',
      borderTopWidth: 1,
      borderTopColor: '#3c3c5c',
      alignItems: 'center',
    }}>
      <TouchableOpacity 
        style={{
          backgroundColor: '#ff4d67',
          paddingVertical: 14,
          paddingHorizontal: 60,
          borderRadius: 25,
        }}
        onPress={onPress}
        disabled={footerDisabled}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
