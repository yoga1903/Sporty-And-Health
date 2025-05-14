import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Alert, Button } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ItemSmall } from '../../components';
import axios from 'axios';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const ProfileScreen = ({ bookmarks }) => {
  const [articles, setArticles] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const fetchArticles = async () => {
    try {
      const response = await axios.get('https://681afe7c17018fe5057964ad.mockapi.io/api/blog');
      setArticles(response.data);
    } catch (error) {
      Alert.alert('Gagal mengambil artikel');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete('https://681afe7c17018fe5057964ad.mockapi.io/api/blog/${id}');
      fetchArticles();
    } catch (error) {
      Alert.alert('Gagal menghapus artikel');
    }
  };

  useEffect(() => {
    if (isFocused) fetchArticles();
  }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      <Animatable.View animation="zoomIn" duration={800} style={styles.profileBox}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' }}
          style={styles.image}
        />
        <Text style={styles.name}>Satria Adiyoga</Text>
        <Text style={styles.info}>22180140</Text>
      </Animatable.View>

      <Text style={styles.subHeader}>Bookmark Anda</Text>
      {bookmarks.map((item, index) => (
        <Animatable.View key={index} animation="fadeInUp" duration={600} delay={index * 100}>
          <ItemSmall data={item} isBookmarked={true} />
        </Animatable.View>
      ))}

      <Text style={styles.subHeader}>Artikel Anda</Text>
      {articles.map((item, index) => (
        <Animatable.View key={index} animation="fadeInUp" duration={600} delay={index * 100} style={{ marginBottom: 10 }}>
          <ItemSmall data={item} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
            <Button title="Edit" onPress={() => navigation.navigate('Form', { article: item })} color="#00AEEF" />
            <Button title="Delete" onPress={() => handleDelete(item.id)} color="#FF4444" />
          </View>
        </Animatable.View>
      ))}
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: '#111' },
  profileBox: { alignItems: 'center', marginVertical: 20 },
  image: { width: 100, height: 100, borderRadius: 50 },
  name: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  info: { color: '#AAA', fontSize: 14 },
  subHeader: { fontSize: 18, fontWeight: 'bold', color: '#00AEEF', margin: 10 },
});