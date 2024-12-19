import { Stack } from "expo-router";
import "./i18n";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {

  const insets = useSafeAreaInsets();
  return (
    <View style={{
      flex: 1, marginTop: insets.top
    }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
