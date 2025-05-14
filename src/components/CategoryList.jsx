import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function CategoryList({ categories, selectedCategory, onSelectCategory }) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryBox,
              selectedCategory === category && styles.selectedBox,
            ]}
            onPress={() => onSelectCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  categoryBox: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBox: {
    backgroundColor: '#00AEEF',
  },
  categoryText: {
    color: '#FFF',
    fontSize: 14,
  },
  selectedText: {
    fontWeight: 'bold',
    color: '#FFF',
  },
});
