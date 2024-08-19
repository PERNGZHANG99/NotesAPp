import AsyncStorage from '@react-native-async-storage/async-storage';

const ICONS_KEY = 'icons_storage';

// Function to initialize icons if not already present
export const initializeIcons = async () => {
  try {
    const icons = await AsyncStorage.getItem(ICONS_KEY);
    if (!icons) {
      const initialIcons = [
        { id: 1, name: 'Book', icon: 'book-outline' },
        { id: 2, name: 'Home', icon: 'home-outline' },
        { id: 3, name: 'Heart', icon: 'heart-outline' },
        { id: 4, name: 'Star', icon: 'star-outline' },
        { id: 5, name: 'Person', icon: 'person-outline' },
        { id: 6, name: 'Briefcase', icon: 'briefcase-outline' },
        { id: 7, name: 'Checkmark', icon: 'checkmark-outline' },
        { id: 8, name: 'Light Bulb', icon: 'bulb-outline' },
        { id: 9, name: 'Calendar', icon: 'calendar-outline' },
        { id: 10, name: 'Shopping Cart', icon: 'cart-outline' },
      ];
      await AsyncStorage.setItem(ICONS_KEY, JSON.stringify(initialIcons));
    }
  } catch (error) {
    console.error('Failed to initialize icons:', error.message);
  }
};

// Function to get all icons
export const getIcons = async () => {
  try {
    const icons = await AsyncStorage.getItem(ICONS_KEY);
    return icons ? JSON.parse(icons) : [];
  } catch (error) {
    console.error('Failed to load icons:', error.message);
    throw new Error('Failed to load icons.');
  }
};

// Function to add a new icon
export const addIcon = async (newIcon) => {
  try {
    const icons = await getIcons();
    const updatedIcons = [...icons, newIcon];
    await AsyncStorage.setItem(ICONS_KEY, JSON.stringify(updatedIcons));
  } catch (error) {
    console.error('Failed to add icon:', error.message);
    throw new Error('Failed to add icon.');
  }
};

// Function to remove an icon by ID
