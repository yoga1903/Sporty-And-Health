import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Alert, Button } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ItemSmall } from '../../components';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const ProfileScreen = ({ bookmarks }) => {
  const [articles, setArticles] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const fetchArticles = async () => {
    try {
      const snapshot = await firestore().collection('articles').get();
      const articleList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setArticles(articleList);
    } catch (error) {
      console.error('Firestore Fetch Error:', error);
      Alert.alert('Gagal mengambil artikel');
    }
  };

  const handleDelete = async (id) => {
    try {
      await firestore().collection('articles').doc(id).delete();
      fetchArticles();
    } catch (error) {
      console.error('Firestore Delete Error:', error);
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
          source={{
            uri: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500&auto=format&fit=crop&q=60',
          }}
          style={styles.image}
        />
        <Text style={styles.name}>Satria Adiyoga</Text>
        <Text style={styles.info}>22180140</Text>
      </Animatable.View>

      <Text style={styles.subHeader}>Artikel Anda</Text>
      {articles.map((item, index) => (
        <Animatable.View key={item.id} animation="fadeInUp" duration={600} delay={index * 100} style={{ marginBottom: 10 }}>
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
