import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addCategory, getCategories, removeCategory } from '../../utils/categoryStorage';
import { getIcons, initializeIcons } from '../../utils/iconStorage';
import { statusBarHeight } from '../../config';
import Header from '../../components/screenDesign/Header';

const CategoryManagement = ({ navigation }) => {
  const [newCategory, setNewCategory] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null); // Store selected icon's id
  const [categories, setCategories] = useState([]); 
  const [icons, setIcons] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const loadIcons = async () => {
      await initializeIcons(); // Initialize icons if not present
      const storedIcons = await getIcons();
      setIcons(storedIcons);
    };
    loadIcons();

    const loadCategories = async () => {
      const storedCategories = await getCategories();
      setCategories(storedCategories);
    };
    loadCategories();
  }, []);

  const handleAddCategory = async () => {
    if (newCategory.trim() && selectedIcon) {
      // Check if the category already exists
      const categoryExists = categories.some(
        (category) => category.name.toLowerCase() === newCategory.trim().toLowerCase()
      );
  
      if (categoryExists) {
        Alert.alert('Error', 'This category already exists.');
        return;
      }
  
      // If category doesn't exist, add it
      await addCategory(newCategory.trim(), selectedIcon); // Pass iconId to storage
      const updatedCategories = await getCategories();
      setCategories(updatedCategories);
      setNewCategory('');
      setSelectedIcon(null);
      Keyboard.dismiss();  // Dismiss the keyboard when adding a category
    } else {
      Alert.alert('Error', 'Please enter a category name and select an icon.');
    }
  };
  

  const handleDeleteSelectedCategories = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete the selected categories?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            for (const category of selectedCategories) {
              await removeCategory(category.id);
            }
            const updatedCategories = await getCategories();
            setCategories(updatedCategories);
            setSelectedCategories([]);
          }
        }
      ]
    );
  };

  const handleSelectCategory = (category) => {
    if (category.ableDelete) {
      setSelectedCategories((prevSelected) => {
        if (prevSelected.includes(category)) {
          return prevSelected.filter((cat) => cat.id !== category.id);
        } else {
          return [...prevSelected, category];
        }
      });
    }
  };

  const handleSelectIcon = (icon) => {
    setSelectedIcon(icon); // Set selected icon id
  };

  const renderCategoryItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleSelectCategory(item)} disabled={!item.ableDelete}>
        <View
          style={{
            backgroundColor: selectedCategories.some(cat => cat.id === item.id) ? '#2c3e50' : '#3c3c5c',
            padding: 12,
            borderRadius: 8,
            marginTop: 8,
            marginHorizontal: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name={item.iconId} size={24} color="white" style={{ marginRight: 10 }} />
            <Text style={{ color: 'white' }}>{item.name}</Text>
          </View>
          {item.ableDelete && (
            <Text style={{ color: selectedCategories.some(cat => cat.id === item.id) ? '#e74c3c' : '#b2b2d8' }}>
              {selectedCategories.some(cat => cat.id === item.id) ? 'Selected' : 'Select'}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderIconItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectIcon(item.icon)}> 
      <View style={{ padding: 10, alignItems: 'center' }}>
        <Ionicons name={item.icon} size={30} color={selectedIcon === item.icon ? '#ff4081' : '#b2b2d8'} />
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, backgroundColor: '#1a1a2e', paddingTop: statusBarHeight }}>
        <Header title="Categories Management" onBackPress={() => navigation.goBack()} />

        <View style={{ padding: 16 }}>
          <Text style={{ color: 'white', marginBottom: 8 }}>Enter New Category Name</Text>
          <TextInput
            style={{
              backgroundColor: '#3c3c5c',
              padding: 12,
              borderRadius: 8,
              color: 'white',
              marginBottom: 16,
            }}
            placeholder="Category Name"
            placeholderTextColor="#b2b2d8"
            value={newCategory}
            onChangeText={setNewCategory}
            blurOnSubmit={false}
          />
          <Text style={{ color: 'white', marginBottom: 8 }}>Select One Icon</Text>
          <FlatList
            data={icons}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderIconItem}
            horizontal
            contentContainerStyle={{ marginBottom: 16 }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#4a90e2',
              padding: 12,
              borderRadius: 8,
              alignItems: 'center',
            }}
            onPress={handleAddCategory}
          >
            <Text style={{ color: 'white' }}>Add Category</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCategoryItem}
          keyboardShouldPersistTaps="handled"
          extraData={selectedCategories}
        />

        {selectedCategories.length > 0 && (
          <TouchableOpacity
            style={{
              backgroundColor: '#d9534f',
              padding: 12,
              borderRadius: 8,
              alignItems: 'center',
              marginTop: 16,
              marginHorizontal: 16,
            }}
            onPress={handleDeleteSelectedCategories}
          >
            <Text style={{ color: 'white' }}>Delete Selected Categories</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default CategoryManagement;
