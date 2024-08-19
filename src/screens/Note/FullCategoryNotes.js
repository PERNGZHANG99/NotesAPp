import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getNotesByCategory, removeNote } from '../../utils/noteStorage';
import ScreenTemplateWithoutNavigation from '../../components/screenDesign/ScreenTemplateWithoutNavigation';
import { useFocusEffect } from '@react-navigation/native';

const FullCategoryNotes = ({ route, navigation }) => {
  const { categoryName, categoryId } = route.params;
  const headerName = `${categoryName} Note List`;
  const [notes, setNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const loadNotes = async () => {
    const storedCategories = await getNotesByCategory();
    const selectedCategory = storedCategories.find(category => category.category.id === categoryId);
    
    if (selectedCategory && selectedCategory.notes) {
      const sortedNotes = selectedCategory.notes.sort((a, b) => new Date(b.updateDate) - new Date(a.updateDate));
      setNotes(sortedNotes);
    } else {
      setNotes([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [categoryId])
  );

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedNotes([]);
  };

  const handleLongPress = (note) => {
    if (!isSelectionMode) return;

    setSelectedNotes(prevSelected => {
      if (prevSelected.includes(note)) {
        return prevSelected.filter(selectedNote => selectedNote !== note);
      } else {
        return [...prevSelected, note];
      }
    });
  };

  const handleShortPress = (note) => {
    if (isSelectionMode) {
      handleLongPress(note);
    } else {
      navigation.navigate('Note', { note, isNew: false });
    }
  };

  const handleDeleteSelectedNotes = async () => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete ${selectedNotes.length} note${selectedNotes.length > 1 ? 's' : ''}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            for (const note of selectedNotes) {
              await removeNote(note);
            }
            await loadNotes();
            setSelectedNotes([]);
            setIsSelectionMode(false);
          },
          style: "destructive"
        }
      ]
    );
  };

  const renderNotes = () => {
    if (!notes || notes.length === 0) {
      return <Text style={{ color: 'gray' }}>No notes available in this category</Text>;
    }

    return notes.map((note, index) => {
      const isSelected = selectedNotes.includes(note);
      return (
        <TouchableOpacity 
          key={index}
          onLongPress={() => handleLongPress(note)}
          onPress={() => handleShortPress(note)}
          style={[styles.noteBox, isSelected && styles.selectedNoteBox]}
        >
          <Text style={{ color: isSelected ? '#e74c3c' : 'white', marginBottom: 5 }}>
            {note.content}
          </Text>
          <Text style={{ color: 'gray', fontSize: 12 }}>
            {new Date(note.updateDate).toLocaleString()}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <ScreenTemplateWithoutNavigation
      headerTitle={headerName}
      onBackPress={() => navigation.goBack()}
      footerText={`Delete (${selectedNotes.length})`}
      onFooterPress={selectedNotes.length > 0 ? handleDeleteSelectedNotes : null}
      footerDisabled={selectedNotes.length === 0}
    >
      <View style={{ flex: 1, padding: 16 }}>
        <View style={styles.iconRow}>
          {/* Toggle Selection Mode Button */}
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={toggleSelectionMode}
          >
            <Ionicons 
              name={isSelectionMode ? "trash-outline" : "trash-outline"} 
              size={24} 
              color={isSelectionMode ? "red" : "white"} 
            />
          </TouchableOpacity>
          
          {/* Add New Note Button */}
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => navigation.navigate('Note', { isNew: true })}
          >
            <Ionicons 
              name="add-outline" 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>
        </View>

        {/* Notes List */}
        <ScrollView style={{ marginTop: 10 }}>
          {renderNotes()}
        </ScrollView>
      </View>
    </ScreenTemplateWithoutNavigation>
  );
};

const styles = {
  noteBox: {
    paddingVertical: 10, 
    paddingHorizontal: 16, 
    borderRadius: 10, 
    backgroundColor: '#2c2c54', 
    marginBottom: 10,
  },
  selectedNoteBox: {
    backgroundColor: '#444',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  iconButton: {
    marginLeft: 10,
  },
};

export default FullCategoryNotes;
