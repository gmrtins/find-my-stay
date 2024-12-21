import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import colors from "../theme/colors";

export default function TabLayout() {
    const { t } = useTranslation();

    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: colors.BLUE }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: t("tab_homepage"),
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={20} name="hotel" color={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="Favorites"
                options={{
                    title: t("tab_favorites"),
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={20} name="bookmark-o" color={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="Settings"
                options={{
                    title: t("tab_settings"),
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={20} name="gear" color={color} />
                    ),
                    headerShown: false,
                }}
            />
        </Tabs>
    );
}
