import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import ScreenTemplateWithoutNavigation from '../../components/screenDesign/ScreenTemplateWithoutNavigation';

const PrivacyPolicy = ({ navigation }) => {
  return (
    <ScreenTemplateWithoutNavigation
      headerTitle="Privacy Policy"
      onBackPress={() => navigation.goBack()}  // Go back to the previous screen
      hideFooter={true}
    >
      <ScrollView style={{ padding: 16 }}>
        <Text style={{ color: 'white', marginBottom: 10, fontSize: 16 }}>
          {/* Add your privacy policy content here */}
          This is the Privacy Policy content. We are committed to protecting your privacy. 
          This document outlines how we handle your personal data...
        </Text>
      </ScrollView>
    </ScreenTemplateWithoutNavigation>
  );
};

export default PrivacyPolicy;
