import { Stack, useRouter } from "expo-router";
import "./i18n";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { changeLanguage } from "i18next";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./configs/firebaseConfig";
import { useTranslation } from "react-i18next";
import { HotelDetailsParams } from "./types";
import { FavoritesProvider } from "./contexts/FavoriteContext";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function RootLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/screens/LoginScreen');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);
  const insets = useSafeAreaInsets();
  if (!fontsLoaded) {
    return null;
  }
  return (
    <FavoritesProvider>
      <View style={{
        flex: 1, marginTop: insets.top
      }}>
        <Stack initialRouteName="screens/LoginScreen">
          <Stack.Screen name="screens/LoginScreen" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false, title: t("hotels_list_title"), }} />
          <Stack.Screen
            name="screens/HotelDetails"
            options={({ route }) => ({
              title: (route.params as HotelDetailsParams)?.name || t("hotel_details_title"),
            })}
          />
        </Stack>
      </View>
    </FavoritesProvider>
  );
}
