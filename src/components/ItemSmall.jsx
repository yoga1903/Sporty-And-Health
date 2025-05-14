import React, { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const ItemSmall = ({ data, onBookmark, isBookmarked }) => {
  const [likeCount, setLikeCount] = useState(0);
  const likeAnim = useRef(new Animated.Value(1)).current;
  const commentAnim = useRef(new Animated.Value(1)).current;
  const shareAnim = useRef(new Animated.Value(1)).current;

  const animateButton = (animRef) => {
    Animated.sequence([
      Animated.timing(animRef, { toValue: 1.2, duration: 100, useNativeDriver: true }),
      Animated.timing(animRef, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const handleLike = async () => {
    animateButton(likeAnim);
    setLikeCount(prev => prev + 1);
    await playSound();
  };

  const handleComment = () => {
    animateButton(commentAnim);
    console.log('Commented!');
  };

  const handleShare = () => {
    animateButton(shareAnim);
    console.log('Shared!');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: data.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.desc}>{data.description}</Text>

        <TouchableOpacity onPress={onBookmark}>
          <Text style={[styles.bookmark, { color: isBookmarked ? '#FFD700' : '#00AEEF' }]}>
            {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
          </Text>    
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <Animated.View style={{ transform: [{ scale: likeAnim }] }}>
            <TouchableOpacity onPress={handleLike}>
              <Text style={styles.action}>❤️ Like ({likeCount})</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{ transform: [{ scale: commentAnim }] }}>
            <TouchableOpacity onPress={handleComment}>
              <Text style={styles.action}>💬 Comment</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{ transform: [{ scale: shareAnim }] }}>
            <TouchableOpacity onPress={handleShare}>
              <Text style={styles.action}>📤 Share</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
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
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  action: {
    color: '#00AEEF',
    fontSize: 14,
    fontWeight: '600',
  },
});
