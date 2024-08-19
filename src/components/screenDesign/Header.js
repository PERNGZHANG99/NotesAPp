import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ title, onBackPress }) => {
  
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#1a1a2e',
      borderBottomWidth: 1,
      borderBottomColor: '#3c3c5c'
    }}>
      <TouchableOpacity onPress={onBackPress}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={{ fontSize: 20, color: 'white', marginLeft: 16 }}>
        {title}
      </Text>
    </View>
  );
};

export default Header;