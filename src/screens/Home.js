import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getNotesByCategory } from '../utils/noteStorage';
import ScreenTemplateWithNavigation from '../components/screenDesign/ScreenTemplateWithNavigation';

const Home = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);

  const loadNotes = async () => {
    const storedCategories = await getNotesByCategory();

    if (Array.isArray(storedCategories)) {
      setCategories(storedCategories);

      // Automatically expand categories with notes
      const expanded = storedCategories
        .filter(category => category.notes && category.notes.length > 0)
        .map(categoryObj => categoryObj.category.name);

      setExpandedCategories(expanded);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  const handleToggleCategory = (categoryName) => {
    setExpandedCategories(prevExpandedCategories =>
      prevExpandedCategories.includes(categoryName)
        ? prevExpandedCategories.filter(cat => cat !== categoryName)
        : [...prevExpandedCategories, categoryName]
    );
  };

  const renderNotes = (notes) => {
    if (!notes || notes.length === 0) {
      return <Text style={{ color: 'gray' }}>No notes available</Text>;
    }
  
    return notes.slice(0, 3).map((note, index) => {
      const contentPreview = note.content.length > 20
        ? `${note.content.substring(0, 20)}...`
        : note.content;
  
      return (
        <TouchableOpacity 
          key={index} 
          style={styles.noteContainer} 
          onPress={() => navigation.navigate('Note', { note, isNew: false })} // Navigate with isNew: false
        >
          <Text style={styles.noteText}>{contentPreview}</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#ff4081" />
        </TouchableOpacity>
      );
    });
  };

  return (
    <ScreenTemplateWithNavigation>
      <View style={{ flex: 1, padding: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 24, color: 'white' }}>Home</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 18, color: 'gray', marginTop: 20 }}>
          Recently created notes
        </Text>

        <ScrollView style={{ marginTop: 20 }}>
          {categories.length > 0 ? (
            categories.map((categoryObj, index) => (
              <View key={index} style={styles.categoryContainer}>
                <TouchableOpacity onPress={() => handleToggleCategory(categoryObj.category.name)}>
                  <View style={styles.categoryHeader}>
                    <Ionicons name={categoryObj.category.iconId} size={24} color="#ff4081" />
                    <Text style={styles.categoryTitle}>{categoryObj.category.name}</Text>
                    <Ionicons 
                      name={expandedCategories.includes(categoryObj.category.name) ? "chevron-up-outline" : "chevron-down-outline"} 
                      size={24} 
                      color="white" 
                      style={styles.arrowIcon}
                    />
                  </View>
                </TouchableOpacity>

                {expandedCategories.includes(categoryObj.category.name) && (
                  <View style={styles.notesList}>
                    {renderNotes(categoryObj.notes)}
                    <TouchableOpacity 
                      style={styles.moreButton} 
                      onPress={() => navigation.navigate('FullCategoryNotes', { 
                        categoryName: categoryObj.category.name, 
                        categoryId: categoryObj.category.id 
                      })}
                    >
                      <Text style={styles.moreText}>More</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          ) : (
            <Text style={{ color: 'gray' }}>No categories available</Text>
          )}
        </ScrollView>
      </View>
    </ScreenTemplateWithNavigation>
  );
};

const styles = {
  categoryContainer: {
    marginBottom: 20,
    backgroundColor: '#292d3e',
    padding: 16,
    borderRadius: 10,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Aligns the arrow icon to the right
  },
  categoryTitle: {
    fontSize: 18,
    color: 'white',
    flex: 1, // Ensures the title takes up available space
    marginLeft: 10,
  },
  arrowIcon: {
    marginLeft: 'auto', // Pushes the arrow to the far right
  },
  notesList: {
    marginTop: 10,
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3c3c5c',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  noteText: {
    color: 'white',
    fontSize: 16,
  },
  moreButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  moreText: {
    color: '#ff4081',
    fontWeight: 'bold',
  },
};

export default Home;
