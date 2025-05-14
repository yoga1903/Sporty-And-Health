import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function ListHorizontal({ data, selected, onSelect }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const isSelected = selected === item;
          return (
            <TouchableOpacity
              onPress={() => onSelect(item)}
              style={[styles.item, isSelected && styles.selectedItem]}>
              <Text style={[styles.text, isSelected && styles.selectedText]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#333',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedItem: {
    backgroundColor: '#00AEEF',
  },
  text: {
    color: '#fff',
    fontWeight: '400',
  },
  selectedText: {
    fontWeight: 'bold',
  },
});
