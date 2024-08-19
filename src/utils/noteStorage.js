import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCategories } from './categoryStorage';

const NOTES_KEY = 'notes';

// Save note
export const saveNote = async (note) => {
  try {
    const notes = await AsyncStorage.getItem(NOTES_KEY);
    const notesArray = notes ? JSON.parse(notes) : [];

    // If the note doesn't have an ID, assign one
    if (!note.id) {
      // Check if there are no notes, then start with ID 1
      const highestId = notesArray.length === 0 ? 0 : notesArray.reduce((maxId, note) => Math.max(maxId, note.id || 0), 0);
      note.id = highestId + 1;
    } else {
      throw new Error('Note already has an ID. This function is only for adding new notes.');
    }

    console.log("Note", note)
    // Add the new note
    notesArray.push(note);

    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notesArray));
  } catch (error) {
    console.error('Error saving note:', error.message);
    throw new Error('Failed to save the note.');
  }
};

// Fetch notes
export const getNotes = async () => {
  try {
    const notes = await AsyncStorage.getItem(NOTES_KEY);
    return notes ? JSON.parse(notes) : [];
  } catch (error) {
    console.error('Error fetching notes:', error.message);
    throw new Error('Failed to fetch notes.');
  }
};

export const getNotesByCategory = async () => {
  try {
    const categories = await getCategories();
    const notes = await AsyncStorage.getItem(NOTES_KEY);
    const parsedNotes = notes ? JSON.parse(notes) : [];

    const notesByCategory = parsedNotes.reduce((acc, note) => {
      if (!acc[note.categoryId]) {
        acc[note.categoryId] = [];
      }
      acc[note.categoryId].push(note);
      return acc;
    }, {});

    return categories.map(category => ({
      category,
      notes: notesByCategory[category.id]
        ? notesByCategory[category.id].sort((a, b) => new Date(b.updateDate) - new Date(a.updateDate))
        : [],
    }));
  } catch (error) {
    console.error('Error loading notes by category:', error.message);
    throw new Error('Failed to load notes by category.');
  }
};


export const deleteNote = async (note) => {
  try {
    const notes = await AsyncStorage.getItem(NOTES_KEY);
    const parsedNotes = notes ? JSON.parse(notes) : [];

    // Filter out the note that needs to be deleted by comparing its id
    const updatedNotes = parsedNotes.filter(n => n.id !== note.id);

    // Save the updated notes array back to AsyncStorage
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
  } catch (error) {
    console.error(`Error deleting note (ID: ${note.id}):`, error.message);
    throw new Error('Failed to delete the note.');
  }
};

export const updateNote = async (updatedNote) => {
  try {
    const existingNotes = await AsyncStorage.getItem(NOTES_KEY);
    const notes = existingNotes ? JSON.parse(existingNotes) : [];

    // Find the note by its ID and update it
    const updatedNotes = notes.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    );

    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
  } catch (error) {
    console.error('Error updating note:', error.message);
    throw new Error('Failed to update the note.');
  }
};

export const deleteAllNotes = async () => {
  try {
    await AsyncStorage.removeItem(NOTES_KEY) ;
  } catch (error) {
    console.error( 'Error deleting all notes:', error. message); throw new Error('Failed to delete all notes.');
  }
};