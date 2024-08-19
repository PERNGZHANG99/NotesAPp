import React, { useState, useCallback } from 'react';
import { View, TextInput, Text, Alert, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import ScreenTemplateWithoutNavigation from '../../components/screenDesign/ScreenTemplateWithoutNavigation';
import { saveNote, updateNote, deleteNote } from '../../utils/noteStorage';
import { getCategories } from '../../utils/categoryStorage';
import { useFocusEffect } from '@react-navigation/native';

const Note = ({ route, navigation }) => {
  const maxLength = 200;
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const { note: initialNote = null, isNew = false } = route.params || {};

  const loadCategories = async () => {
    const storedCategories = await getCategories();
    setCategories(storedCategories.map(cat => ({ label: cat.name, value: cat.id })));
  };

  useFocusEffect(
    useCallback(() => {
      // Reset state when screen is focused
      setCategory(isNew ? null : initialNote?.categoryId);
      setContent(isNew ? '' : initialNote?.content);
      setIsEditing(isNew);

      // Load categories from storage
      loadCategories();
    }, [isNew, initialNote])
  )

  const handleSave = async () => {
    if (!category || !content.trim()) {
      Alert.alert('Please select a category and enter note content.');
      return;
    }

    const isCategoryChanged = category !== initialNote?.categoryId;
    const isContentChanged = content.trim() !== initialNote?.content.trim();

    if (!isNew && !isCategoryChanged && !isContentChanged) {
      Alert.alert('No changes were made.');
      return;
    }

    const handleUpdate = async () => {
      const updatedNote = {
        ...initialNote,
        categoryId: category,
        content,
        updateDate: new Date().toISOString(),
      };

      try {
        await updateNote(updatedNote);
        navigation.goBack();
      } catch (error) {
        Alert.alert('Error', 'Failed to save the note.');
      }
    };

    const handleSaveNew = async () => {
      const newNote = {
        categoryId: category,
        content,
        creationDate: new Date().toISOString(),
        updateDate: new Date().toISOString(),
      };

      try {
        await saveNote(newNote);
        Alert.alert(
          'Success',
          'Note saved successfully! Do you want to add another note?',
          [
            {
              text: 'No',
              onPress: () => navigation.goBack(),
            },
            {
              text: 'Yes',
              onPress: () => {
                setCategory(null);
                setContent('');
                setIsEditing(true);
              },
            },
          ]
        );
      } catch (error) {
        Alert.alert('Error', 'Failed to save the note.');
      }
    };

    if (isNew) {
      handleSaveNew();
    } else {
      let changeType = '';
      if (isCategoryChanged && isContentChanged) {
        changeType = 'Both the category and content';
      } else if (isCategoryChanged) {
        changeType = 'The category';
      } else if (isContentChanged) {
        changeType = 'The content';
      }

      Alert.alert(
        "Confirm Changes",
        `${changeType} were changed. Do you want to save the changes?`,
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Save",
            onPress: handleUpdate
          }
        ]
      );
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this note?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteNote(initialNote);
            navigation.goBack();
          },
        },
      ]
    );
  };


  return (
    <ScreenTemplateWithoutNavigation 
      headerTitle={isNew ? "New Note" : isEditing ? "Edit Note" : "View Note"} 
      onBackPress={() =>  navigation.goBack()}
      hideFooter={true}
    >
      <TouchableWithoutFeedback onPress={() => { setOpen(false); Keyboard.dismiss(); }}>
        <View style={{ flex: 1, padding: 16 }}>
          <View style={{ zIndex: 1000, marginBottom: 20 }}>
            <DropDownPicker
              open={open}
              value={category}
              items={categories}
              setOpen={setOpen}
              setValue={setCategory}
              placeholder="Choose a category"
              style={{
                backgroundColor: '#3c3c5c',
                borderRadius: 8,
              }}
              textStyle={{ color: '#b2b2d8' }}
              dropDownContainerStyle={{
                backgroundColor: '#3c3c5c',
              }}
              closeOnBackPressed={true}
              closeOnBackdropPress={true}
              onOpen={() => Keyboard.dismiss()}
              disabled={!isEditing && !isNew}
            />
          </View>

          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1, position: 'relative' }}>
              <TextInput
                style={{
                  backgroundColor: '#3c3c5c',
                  padding: 16,
                  borderRadius: 8,
                  color: 'white',
                  height: 150,
                  textAlignVertical: 'top',
                }}
                placeholder="Please input note content"
                placeholderTextColor="#b2b2d8"
                multiline
                maxLength={maxLength} 
                value={content}
                onChangeText={setContent}
                editable={isEditing || isNew}
              />
              <Text style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                color: '#b2b2d8',
              }}>
                {content ? content.length : 0}/{maxLength}
              </Text>
            </View>
          </ScrollView>

          {!isNew && !isEditing && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity 
                style={[styles.button, { backgroundColor: '#ff4d8d' }]}
                onPress={handleDelete}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, { backgroundColor: '#4d8dff' }]}
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}

          {(isEditing || isNew) && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              {!isNew && (
                <TouchableOpacity 
                  style={[styles.button, { backgroundColor: '#444', flex: 1 }]} // Adjust flex to make buttons equal size
                  onPress={() => {
                    setIsEditing(false);
                    setCategory(initialNote?.categoryId);
                    setContent(initialNote?.content);
                  }}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity 
                style={[styles.button, { backgroundColor: '#4d8dff', flex: 1 }]} // Adjust flex to make buttons equal size
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </ScreenTemplateWithoutNavigation>
  );
};

const styles = {
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    flex: 1, // Make buttons equal size
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
};

export default Note;
