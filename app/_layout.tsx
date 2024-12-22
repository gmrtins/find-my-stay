import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./configs/firebaseConfig";
import { useTranslation } from "react-i18next";
import { FavoritesProvider } from "./contexts/FavoriteContext";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import colors from "./theme/colors";

import { NavigationContainer, NavigationIndependentTree, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from "./(tabs)/Settings";
import Homepage from "./(tabs)/Homepage";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Favorites from "./(tabs)/Favorites";
import HotelDetails from "./screens/HotelDetails";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function RootLayout() {
  const { t } = useTranslation();
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState(null);
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const onAuthStateChangedHandler = (user) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onAuthStateChangedHandler);

    return unsubscribe;
  }, []);


  if (initializing || !fontsLoaded) {
    return (
      <SplashScreen navigation={undefined} />
    );
  }

  function MainTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Homepage} options={{
          headerShown: false,
          title: t("tab_homepage"),
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="hotel" color={color} />
          ),
        }} />
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            headerShown: false,
            title: t("tab_favorites"),
            tabBarIcon: ({ color }) => (
              <FontAwesome size={20} name="bookmark-o" color={color} />
            ),
          }}
        />
        <Tab.Screen name="Settings" component={Settings} options={{
          headerShown: false,
          title: t("tab_settings"),
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="gear" color={color} />
          ),
        }} />
      </Tab.Navigator>
    );
  }


  return (
    <FavoritesProvider>
      <NavigationIndependentTree>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <>
              <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
              <Stack.Screen name="Details" component={HotelDetails} options={{ headerShown: false }} />
            </>
          ) : (
            <>
              <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            </>
          )}
        </Stack.Navigator>
      </NavigationIndependentTree>
    </FavoritesProvider>
  );
}
