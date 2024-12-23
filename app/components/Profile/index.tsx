import { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { auth } from "../../configs/firebaseConfig";

const PlaceholderImageUri =
  "https://blocks.astratic.com/img/general-img-portrait.png";

const Profile = () => {
  const [imageUri, setImageUri] = useState(auth.currentUser?.photoURL);

  useEffect(() => {
    if (auth.currentUser?.photoURL) setImageUri(auth.currentUser?.photoURL);
  }, [auth]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUri as string }}
        onError={() => setImageUri(PlaceholderImageUri)}
        style={styles.profilePicture}
        resizeMode="cover"
      />

      <View style={styles.column}>
        <Text style={styles.title}>{auth.currentUser?.displayName}</Text>
        <Text style={styles.subtitle}>{auth.currentUser?.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 32,
    alignItems: "center",
  },
  profilePicture: { width: 60, height: 60, borderRadius: 60 },
  column: { flexDirection: "column" },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    color: "white",
  },
  subtitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "white",
  },
});

export default Profile;