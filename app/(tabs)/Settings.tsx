import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Platform,
    Dimensions,
} from "react-native";
import { logout } from "../configs/firebaseConfig";
import { useState } from "react";
import i18n, { changeAppLanguage } from "../i18n";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTranslation } from "react-i18next";
import colors from "../theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Profile from "../components/Profile";
import LanguagePicker from "../components/LanguagePicker";

export default function Settings() {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();

    const [selectedScreen, setSelectedScreen] = useState<"settings" | "language">(
        "settings"
    );
    const [selectedLanguage, setSelectedLanguage] = useState<string>(
        i18n.language
    );

    const applyLanguage = () => {
        if (selectedLanguage) {
            changeAppLanguage(selectedLanguage);
            setSelectedScreen("settings");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.diagonalBackground}>
                <LinearGradient
                    colors={["#0974d3", colors.BLUE]}
                    style={[styles.gradient, { paddingTop: insets.top + 16 }]}
                />
            </View>

            <View style={styles.content}>
                <Text style={styles.heading}>{t(selectedScreen)}</Text>
                {selectedScreen === "settings" && <Profile />}
                {selectedScreen === "language" && (
                    <LanguagePicker
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                        applyLanguage={applyLanguage}
                    />
                )}

                {selectedScreen === "settings" && (
                    <View style={{ gap: 16 }}>
                        <View style={styles.menu}>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => setSelectedScreen("language")}
                            >
                                <FontAwesome size={16} name="globe" color={colors.BLUE} />
                                <Text style={styles.menuText}>
                                    {t("settings_screen_language_btn")}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.menu}>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => logout()}
                            >
                                <FontAwesome size={16} name="plane" color={colors.BLUE} />
                                <Text style={styles.menuText}>
                                    {t("settings_screen_logout_btn")}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    diagonalBackground: {
        position: "absolute",
        top: -100,
        width: Platform.OS === 'ios' ? Dimensions.get("window").width : Dimensions.get("window").width * 3,
        right: 0,
        height: 360,
        transform: [{ skewY: "-10deg" }],
        overflow: "hidden",
    },
    gradient: {
        flex: 1,
    },
    content: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 20,
        fontFamily: "Poppins_700Bold",
    },
    menu: {
        backgroundColor: "white",
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        gap: 8,
    },
    settingItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
    },
    divider: {
        backgroundColor: "#f2f2f2",
        width: "100%",
        height: 1,
    },
    label: {
        fontSize: 16,
        color: "#333333",
    },
    menuText: {
        fontSize: 16,
        color: "#333333",
        fontFamily: "Poppins_600SemiBold",
    },
    saveButton: {
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: "center",
    },
    saveButtonText: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
        color: "#333333",
    },
});
