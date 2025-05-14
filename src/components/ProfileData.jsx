import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ProfileData = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://via.placeholder.com/100" }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Nama Pengguna</Text>
      <Text style={styles.email}>email@example.com</Text>
      {/* Tambah info lain jika diperlukan */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  email: {
    fontSize: 14,
    color: "#aaa",
  },
});

export default ProfileData;
