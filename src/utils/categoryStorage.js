import AsyncStorage from '@react-native-async-storage/async-storage';

const CATEGORIES_KEY = 'categories';

// Fetch all categories
export const getCategories = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(CATEGORIES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error getting categories:', error.message);
    throw new Error('Failed to retrieve categories.');
  }
};

// Add a new category
export const addCategory = async (categoryName, iconId) => {
  try {
    const categories = await getCategories();

    // Check if the category doesn't have an ID, assign one
    const highestId = categories.length === 0 ? 0 : categories.reduce((maxId, category) => Math.max(maxId, category.id || 0), 0);
    const newCategory = {
      id: highestId + 1,
      name: categoryName,
      iconId: iconId, // Store the iconId
      createDate: new Date().toISOString(),
      ableDelete: true // New categories can be deleted by default
    };

    const newCategories = [...categories, newCategory];
    await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(newCategories));
  } catch (error) {
    console.error('Error adding category:', error.message);
    throw new Error('Failed to add the category.');
  }
};

// Remove a category if ableDelete is true
export const removeCategory = async (categoryId) => {
  try {
    const categories = await getCategories();
    const filteredCategories = categories.filter((cat) => cat.id !== categoryId || cat.ableDelete === false);
    
    if (filteredCategories.length === categories.length) {
      throw new Error('This category cannot be deleted.');
    }

    await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(filteredCategories));
  } catch (error) {
    console.error('Error removing category:', error.message);
    throw new Error('Failed to remove the category.');
  }
};

// Initialize default categories if none exist
export const initializeDefaultCategories = async () => {
  try {
    const existingCategories = await getCategories();
    if (existingCategories.length === 0) {
      const defaultCategories = [
        { id: 1, name: "Work and Study", iconId: "book-outline", createDate: new Date().toISOString(), ableDelete: false },
        { id: 2, name: "Life", iconId: "home-outline", createDate: new Date().toISOString(), ableDelete: false },
        { id: 3, name: "Health and Well-being", iconId: "heart-outline", createDate: new Date().toISOString(), ableDelete: false },
      ];
      await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories));
    }
  } catch (error) {
    console.error('Error initializing default categories:', error.message);
    throw new Error('Failed to initialize default categories.');
  }
};
