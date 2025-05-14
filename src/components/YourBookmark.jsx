import React from "react";
import { View, Text, StyleSheet } from "react-native";

const YourBookmark = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Bookmarks</Text>
      {/* Tambahkan daftar bookmark di sini */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4A90E2",
    marginBottom: 10,
  },
});

export default YourBookmark;
