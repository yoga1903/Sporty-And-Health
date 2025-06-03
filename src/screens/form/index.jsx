import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import notifee, { AndroidImportance } from '@notifee/react-native';

export default function FormScreen({ navigation, route }) {
  const isEdit = !!route.params?.article;
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isEdit) {
      const { title, image, category, description } = route.params.article;
      setTitle(title);
      setImage(image);
      setCategory(category);
      setDescription(description);
    }
  }, [route.params?.article]);

  const showNotification = async () => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: 'Artikel Berhasil Ditambahkan',
      body: `Artikel "${title}" telah disimpan.`,
      android: {
        channelId,
      },
    });
  };

  const handleSubmit = async () => {
    if (!title || !image || !category || !description) {
      Alert.alert('Isi semua field');
      return;
    }

    const articleData = { title, image, category, description };

    try {
      const articlesCollection = firestore().collection('articles');

      if (isEdit) {
        await articlesCollection.doc(route.params.article.id).update(articleData);
      } else {
        await articlesCollection.add(articleData);

        // Tampilkan notifikasi setelah 5 detik (hanya untuk tambah, bukan edit)
        setTimeout(() => {
          showNotification();
        }, 5000);
      }

      route.params?.onGoBack?.();
      navigation.goBack();
    } catch (error) {
      console.error('Firestore Error:', error);
      Alert.alert('Gagal menyimpan artikel');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Judul</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Judul"
        placeholderTextColor="#777"
      />

      <Text style={styles.label}>Link Gambar</Text>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
        placeholder="URL Gambar"
        placeholderTextColor="#777"
      />

      <Text style={styles.label}>Kategori</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Kategori"
        placeholderTextColor="#777"
      />

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
