import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
    const { t } = useTranslation();

    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: t("tab_homepage"),
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name="home" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Settings"
                options={{
                    title: t("tab_settings"),
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name="gear" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
