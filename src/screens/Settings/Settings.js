import React from 'react';
import { View, Text, TouchableOpacity, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import ScreenTemplateWithoutNavigation from '../../components/screenDesign/ScreenTemplateWithoutNavigation';
import { deleteAllNotes } from '../../utils/noteStorage';

const Settings = ({ navigation }) => {

  const handleDeleteAll = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete all notes? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            await deleteAllNotes();
            Alert.alert("Success", "All notes have been cleared.");
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleOpenAboutUs = () => {
    const url = 'https://www.merquri.io/about/us';
    Linking.openURL(url).catch((err) => {
      console.error("Failed to open URL: ", err);
      Alert.alert("Error", "Failed to open the URL. Please try again later.");
    });
  };

  const handleOpenOnlineCustomer = () => {
    const url = 'https://www.merquri.io/contact';
    Linking.openURL(url).catch((err) => {
      console.error("Failed to open URL: ", err);
      Alert.alert("Error", "Failed to open the URL. Please try again later.");
    });
  };

  return (
    <ScreenTemplateWithoutNavigation 
      headerTitle="Settings" 
      onBackPress={() => navigation.goBack()}  
      footerText="Delete All Notes"  
      onFooterPress={handleDeleteAll}  
    >
      <View style={{ padding: 16 }}>
        <TouchableOpacity 
          style={{ 
            backgroundColor: '#3c3c5c', 
            padding: 16, 
            borderRadius: 8, 
            marginBottom: 20, 
            flexDirection: 'row',
            alignItems: 'center'
          }}
          onPress={() => navigation.navigate('CategoryManagement')}
        >
          <Ionicons name="folder-outline" size={24} color="white" style={{ marginRight: 10 }} />
          <Text style={{ color: 'white' }}>Category Management</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{ 
            backgroundColor: '#3c3c5c', 
            padding: 16, 
            borderRadius: 8, 
            marginBottom: 20, 
            flexDirection: 'row',
            alignItems: 'center'
          }}
          onPress={() => handleOpenOnlineCustomer()}
        >
          <Ionicons name="chatbox-outline" size={24} color="white" style={{ marginRight: 10 }} />
          <Text style={{ color: 'white' }}>Online Customer</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{ 
            backgroundColor: '#3c3c5c', 
            padding: 16, 
            borderRadius: 8, 
            marginBottom: 20, 
            flexDirection: 'row',
            alignItems: 'center'
          }}
          onPress={() => navigation.navigate('UserAgreement')}
        >
          <Ionicons name="document-text-outline" size={24} color="white" style={{ marginRight: 10 }} />
          <Text style={{ color: 'white' }}>User Agreement</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{ 
            backgroundColor: '#3c3c5c', 
            padding: 16, 
            borderRadius: 8, 
            marginBottom: 20, 
            flexDirection: 'row',
            alignItems: 'center'
          }}
          onPress={() => navigation.navigate('PrivacyPolicy')}
        >
          <Ionicons name="shield-outline" size={24} color="white" style={{ marginRight: 10 }} />
          <Text style={{ color: 'white' }}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{ 
            backgroundColor: '#3c3c5c', 
            padding: 16, 
            borderRadius: 8, 
            marginBottom: 20, 
            flexDirection: 'row',
            alignItems: 'center'
          }}
          onPress={() => handleOpenAboutUs()}
        >
          <Ionicons name="information-circle-outline" size={24} color="white" style={{ marginRight: 10 }} />
          <Text style={{ color: 'white' }}>About Us</Text>
        </TouchableOpacity>
      </View>
    </ScreenTemplateWithoutNavigation>
  );
};

export default Settings;
