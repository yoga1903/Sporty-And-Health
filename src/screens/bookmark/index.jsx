import React, { useState, useCallback } from 'react';
import { ScrollView, Text, View, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import firestore from '@react-native-firebase/firestore';
import ItemSmall from '../../components/ItemSmall';
import { useFocusEffect } from '@react-navigation/native'; // ⬅️ Tambahkan ini

const BookmarkScreen = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const snapshot = await firestore().collection('bookmarks').get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookmarks(data);
      setFilteredBookmarks(data);
    } catch (error) {
      console.error('Gagal mengambil bookmark dari Firestore:', error);
    } finally {
      setLoading(false);
    }
  };

  // Gunakan useFocusEffect untuk auto refresh saat screen aktif kembali
  useFocusEffect(
    useCallback(() => {
      fetchBookmarks();
    }, [])
  );

  // Filter data berdasarkan pencarian
  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const filtered = bookmarks.filter((item) =>
      (item.title || '').toLowerCase().includes(lowerQuery)
    );
    setFilteredBookmarks(filtered);
  };

  // Update hasil pencarian saat query atau data berubah
  React.useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, bookmarks]);

  const hasBookmarks = filteredBookmarks.length > 0;

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" duration={800} style={styles.mainTitle}>
        Sporty <Text style={{ color: '#00C897' }}>And</Text> Health
      </Animatable.Text>

      {/* Search Bar */}
      <Animatable.View animation="fadeInDown" delay={200} duration={600} style={styles.searchBar}>
        <TextInput
          placeholder="Cari bookmark..."
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </Animatable.View>

      {/* Content */}
      {loading ? (
        <ActivityIndicator size="large" color="#00C897" style={{ marginTop: 30 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {hasBookmarks ? (
            <>
              <Animatable.Text
                animation="fadeInDown"
                duration={700}
                delay={300}
                style={styles.headerText}
              >
                📚 Bookmark Anda
              </Animatable.Text>

              {filteredBookmarks.map((item, index) => (
                <Animatable.View
                  key={item.id}
                  animation="fadeInUp"
                  duration={600}
                  delay={index * 150}
                  style={styles.card}
                >
                  <ItemSmall data={item} isBookmarked={true} />
                </Animatable.View>
              ))}
            </>
          ) : (
            <View style={styles.emptyContainer}>
              <Animatable.Text animation="zoomIn" duration={800} style={styles.emptyIcon}>
                🔍
              </Animatable.Text>
              <Animatable.Text animation="fadeIn" delay={200} style={styles.emptyText}>
                Tidak ditemukan
              </Animatable.Text>
              <Text style={styles.suggestionText}>
                Coba kata kunci lain atau periksa ejaan.
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1115',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#00C897',
    alignSelf: 'center',
    paddingBottom: 6,
  },
  searchBar: {
    backgroundColor: '#1d1e23',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchInput: {
    fontSize: 14,
    color: '#ddd',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1e1f23',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#aaa',
    textAlign: 'center',
  },
  suggestionText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});

export default BookmarkScreen;
