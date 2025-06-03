import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ItemSmall = ({ data }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Cek apakah artikel sudah dibookmark saat komponen dimuat
    const checkBookmark = async () => {
      try {
        const docSnapshot = await firestore().collection('bookmarks').doc(data.id).get();
        setIsBookmarked(docSnapshot.exists);
      } catch (error) {
        console.error('Gagal memeriksa bookmark:', error);
      }
    };

    checkBookmark();
  }, [data.id]);

  const handleBookmark = async () => {
    const bookmarkRef = firestore().collection('bookmarks').doc(data.id);

    try {
      if (isBookmarked) {
        // Hapus bookmark
        await bookmarkRef.delete();
        setIsBookmarked(false);
        Alert.alert('Dihapus', 'Artikel dihapus dari bookmark.');
      } else {
        // Tambahkan bookmark
        await bookmarkRef.set(data);
        setIsBookmarked(true);
        Alert.alert('Ditambahkan', 'Artikel ditambahkan ke bookmark.');
      }
    } catch (error) {
      console.error('Gagal toggle bookmark:', error);
      Alert.alert('Error', 'Terjadi kesalahan saat memproses bookmark.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: data.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.desc}>{data.description}</Text>
        <TouchableOpacity onPress={handleBookmark}>
          <Text style={[styles.bookmark, { color: isBookmarked ? '#FFD700' : '#00AEEF' }]}>
            {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ItemSmall;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 10,
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  desc: {
    color: '#AAA',
    marginVertical: 5,
  },
  bookmark: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
