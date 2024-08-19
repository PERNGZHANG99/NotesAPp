import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import ScreenTemplateWithoutNavigation from '../../components/screenDesign/ScreenTemplateWithoutNavigation';

const UserAgreement = ({ navigation }) => {
  return (
    <ScreenTemplateWithoutNavigation
      headerTitle="User Agreement"
      onBackPress={() => navigation.goBack()}  // Go back to the previous screen
      hideFooter={true}
    >
      <ScrollView style={{ padding: 16 }}>
        <Text style={{ color: 'white', marginBottom: 10, fontSize: 16 }}>
          {/* Add your user agreement content here */}
          This is the User Agreement content. Please read it carefully before using the app. 
          By using this app, you agree to the following terms and conditions...
        </Text>
      </ScrollView>
    </ScreenTemplateWithoutNavigation>
  );
};

export default UserAgreement;
