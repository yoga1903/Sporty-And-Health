import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { articles, categories } from './src/data';
import { ListHorizontal, ItemSmall } from './src/components';
import BookmarkScreen from './src/screens/bookmark';
import ProfileScreen from './src/screens/profile';
import FormScreen from './src/screens/form';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeScreen({ navigation, bookmarks, toggleBookmark }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredArticles = articles.filter(
    (item) =>
      (selectedCategory === 'Semua' || item.category === selectedCategory) &&
      item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Animatable.View animation="slideInDown" duration={700} style={styles.headerContainer}>
        <Text style={styles.header}>Sporty & Health</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Form')}>
          <Text style={{ color: '#00AEEF', fontSize: 16, fontWeight: 'bold' }}>Tambah</Text>
        </TouchableOpacity>
      </Animatable.View>
      <TextInput
        style={styles.searchBar}
        placeholder="Cari Artikel"
        placeholderTextColor="#AAA"
        value={search}
        onChangeText={setSearch}
      />
      <ListHorizontal
        data={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <ScrollView>
        {filteredArticles.map((item, index) => (
          <Animatable.View key={index} animation="fadeInUp" duration={600} delay={index * 100}>
            <ItemSmall
              data={item}
              onBookmark={() => toggleBookmark(item)}
              isBookmarked={bookmarks.some(bookmark => bookmark.title === item.title)}
            />
          </Animatable.View>
        ))}
      </ScrollView>
    </View>
  );
}

function MainTabs({ bookmarks, toggleBookmark }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#1C1C1C' },
        tabBarActiveTintColor: '#00AEEF',
        tabBarInactiveTintColor: '#AAA',
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
      }}
    >
      <Tab.Screen
        name="Home"
        children={(props) => (
          <HomeScreen {...props} bookmarks={bookmarks} toggleBookmark={toggleBookmark} />
        )}
        options={{ tabBarLabel: 'Home', tabBarIcon: () => null }}
      />
      <Tab.Screen
        name="Bookmark"
        children={() => <BookmarkScreen bookmarks={bookmarks} />}
        options={{ tabBarLabel: 'Bookmark', tabBarIcon: () => null }}
      />
      <Tab.Screen
        name="Profile"
        children={() => <ProfileScreen bookmarks={bookmarks} />}
        options={{ tabBarLabel: 'Profile', tabBarIcon: () => null }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [bookmarks, setBookmarks] = useState([]);

  const toggleBookmark = (article) => {
    const exists = bookmarks.find(item => item.title === article.title);
    if (exists) {
      setBookmarks(bookmarks.filter(item => item.title !== article.title));
    } else {
      setBookmarks([...bookmarks, article]);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {() => <MainTabs bookmarks={bookmarks} toggleBookmark={toggleBookmark} />}
        </Stack.Screen>
        <Stack.Screen
          name="Form"
          component={FormScreen}
          options={{
            title: 'Tambah Artikel',
            headerStyle: { backgroundColor: '#111' },
            headerTintColor: '#00AEEF',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 10 },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: { fontSize: 26, color: '#00AEEF' },
  searchBar: {
    backgroundColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    color: '#FFF',
    marginBottom: 10,
  },
});
