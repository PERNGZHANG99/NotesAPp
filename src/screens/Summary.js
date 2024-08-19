import React, { useCallback, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getNotesByCategory } from '../utils/noteStorage';
import ScreenTemplateWithNavigation from '../components/screenDesign/ScreenTemplateWithNavigation';
import { useFocusEffect } from '@react-navigation/native';

const Summary = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  const loadNotes = async () => {
    const storedCategories = await getNotesByCategory();

    if (Array.isArray(storedCategories)) {
      setCategories(storedCategories);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  const handleDetailPress = (categoryName, categoryId) => {
    navigation.navigate('FullCategoryNotes', { categoryName, categoryId });
  };

  return (
    <ScreenTemplateWithNavigation>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Summary</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {categories.map((categoryObj, index) => (
          <View key={index} style={styles.container}>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Ionicons name={categoryObj.category.iconId} size={40} color="#ff4081" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{categoryObj.category.name}</Text>
              </View>
              <TouchableOpacity 
                style={styles.detailButton} 
                onPress={() => handleDetailPress(categoryObj.category.name, categoryObj.category.id)}
              >
                <Text style={styles.detailText}>Detail</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>
                This topic has a total of {categoryObj.notes.length} record{categoryObj.notes.length !== 1 ? 's' : ''}.
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </ScreenTemplateWithNavigation>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: 'white',
  },
  container: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures spacing between the items
    marginBottom: 5, // Add some space between the row and the description container
  },
  iconContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1, // Takes up remaining space between the icon and the button
  },
  title: {
    fontSize: 18,
    color: 'white',
  },
  descriptionContainer: {
    backgroundColor: '#292b4d',
    borderRadius: 10,
    padding: 10,
  },
  description: {
    fontSize: 14,
    color: '#b2b2d8',
  },
  detailButton: {
    backgroundColor: '#ff4d8d',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  detailText: {
    color: 'white',
    fontSize: 14,
  },
});

export default Summary;
