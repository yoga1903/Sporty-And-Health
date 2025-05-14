import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ItemSmall } from '../../components';

const BookmarkScreen = ({ bookmarks }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {bookmarks.length === 0 ? (
          <Text style={styles.emptyText}>Belum ada bookmark</Text>
        ) : (
          bookmarks.map((item, index) => (
            <Animatable.View key={index} animation="fadeInUp" duration={600} delay={index * 100}>
              <ItemSmall data={item} isBookmarked={true} />
            </Animatable.View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 10,
  },
  emptyText: {
    color: '#AAA',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BookmarkScreen;
