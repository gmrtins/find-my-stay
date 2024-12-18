import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
    const { t } = useTranslation();

    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: "#1A94FF" }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: t("tab_homepage"),
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={20} name="home" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Favorites"
                options={{
                    title: t("tab_favorites"),
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={20} name="bookmark-o" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Settings"
                options={{
                    title: t("tab_settings"),
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={20} name="gear" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
