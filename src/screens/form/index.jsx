import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import axios from 'axios';

export default function FormScreen({ navigation, route }) {
  const isEdit = !!route.params?.article;
  const [title, setTitle] = useState(route.params?.article?.title || '');
  const [image, setImage] = useState(route.params?.article?.image || '');
  const [category, setCategory] = useState(route.params?.article?.category || '');
  const [description, setDescription] = useState(route.params?.article?.description || '');

  const handleSubmit = async () => {
    if (!title || !image || !category || !description) {
      Alert.alert('Isi semua field');
      return;
    }

    const articleData = { title, image, category, description };

    try {
      if (isEdit) {
        await axios.put('https://681afe7c17018fe5057964ad.mockapi.io/api/blog/${route.params.article.id}', articleData);
      } else {
        await axios.post('https://681afe7c17018fe5057964ad.mockapi.io/api/blog' , articleData);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Gagal menyimpan artikel');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Judul</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Judul" placeholderTextColor="#777" />

      <Text style={styles.label}>Link Gambar</Text>
      <TextInput style={styles.input} value={image} onChangeText={setImage} placeholder="URL Gambar" placeholderTextColor="#777" />

      <Text style={styles.label}>Kategori</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Kategori" placeholderTextColor="#777" />

      <Text style={styles.label}>Deskripsi</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Deskripsi"
        placeholderTextColor="#777"
        multiline
      />

      <Button title={isEdit ? 'Update Artikel' : 'Simpan Artikel'} onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#111', flex: 1 },
  label: { color: '#FFF', marginTop: 10 },
  input: {
    backgroundColor: '#222',
    color: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 4,
  },
});
