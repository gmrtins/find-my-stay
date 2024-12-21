import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Image,
} from "react-native";
import { logout, auth } from "../configs/firebaseConfig";
import { useEffect, useState } from "react";
import i18n, { changeAppLanguage } from "../i18n";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTranslation } from "react-i18next";
import colors from "../theme/colors";

const PlaceholderImageUri =
    "https://blocks.astratic.com/img/general-img-portrait.png";

export default function Settings() {
    const { t } = useTranslation();
    const [imageUri, setImageUri] = useState(auth.currentUser?.photoURL);
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

    useEffect(() => {
        if (auth.currentUser?.photoURL) setImageUri(auth.currentUser?.photoURL);
    }, [auth]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.diagonalBackground}>
                <LinearGradient
                    colors={["#0974d3", colors.BLUE]}
                    style={styles.gradient}
                />
            </View>

            <View style={styles.content}>
                <Text style={styles.heading}>{t(selectedScreen)}</Text>

                {selectedScreen === "settings" && (
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 16,
                            marginBottom: 32,
                            alignItems: "center",
                        }}
                    >
                        <Image
                            source={{ uri: imageUri as string }}
                            onError={() => setImageUri(PlaceholderImageUri)}
                            style={{ width: 60, height: 60, borderRadius: 60 }}
                            resizeMode="cover"
                        />

                        <View style={{ flexDirection: "column" }}>
                            <Text
                                style={{
                                    fontFamily: "Poppins_700Bold",
                                    fontSize: 22,
                                    color: "white",
                                }}
                            >
                                {auth.currentUser?.displayName}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: "Poppins_500Medium",
                                    fontSize: 16,
                                    color: "white",
                                }}
                            >
                                {auth.currentUser?.email}
                            </Text>
                        </View>
                    </View>
                )}

                {selectedScreen === "language" && (
                    <View style={{ gap: 16 }}>
                        <View
                            style={{
                                backgroundColor: "white",
                                borderRadius: 16,
                                paddingHorizontal: 16,
                                paddingVertical: 8,
                                shadowColor: "#000",
                                shadowOpacity: 0.1,
                                shadowRadius: 5,
                                elevation: 2,
                            }}
                        >
                            <TouchableOpacity
                                style={styles.settingItem}
                                onPress={() => setSelectedLanguage("pt-PT")}
                            >
                                <Text style={styles.menuText}>🇵🇹 Português</Text>
                                {selectedLanguage === "pt-PT" && (
                                    <FontAwesome size={16} name="check" color={colors.BLUE} />
                                )}
                            </TouchableOpacity>
                            <View style={styles.divider}></View>
                            <TouchableOpacity
                                style={styles.settingItem}
                                onPress={() => setSelectedLanguage("en-GB")}
                            >
                                <Text style={styles.menuText}>🇬🇧 English</Text>
                                {selectedLanguage === "en-GB" && (
                                    <FontAwesome size={16} name="check" color={colors.BLUE} />
                                )}
                            </TouchableOpacity>
                            <View style={styles.divider}></View>
                            <TouchableOpacity
                                style={styles.settingItem}
                                onPress={() => setSelectedLanguage("es-ES")}
                            >
                                <Text style={styles.menuText}>🇪🇸 Español</Text>
                                {selectedLanguage === "es-ES" && (
                                    <FontAwesome size={16} name="check" color={colors.BLUE} />
                                )}
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={() => {
                                applyLanguage();
                            }}
                        >
                            <Text style={styles.saveButtonText}>{t("save_btn")}</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {selectedScreen === "settings" && (
                    <View style={{ gap: 16 }}>
                        <View
                            style={{
                                backgroundColor: "white",
                                borderRadius: 16,
                                paddingHorizontal: 16,
                                paddingVertical: 8,
                                shadowColor: "#000",
                                shadowOpacity: 0.1,
                                shadowRadius: 5,
                                elevation: 2,
                            }}
                        >
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => setSelectedScreen("language")}
                            >
                                <FontAwesome size={16} name="globe" color={colors.BLUE} />
                                <Text style={styles.menuText}>{t("settings_screen_language_btn")}</Text>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{
                                backgroundColor: "white",
                                borderRadius: 16,
                                paddingHorizontal: 16,
                                paddingVertical: 8,
                                shadowColor: "#000",
                                shadowOpacity: 0.1,
                                shadowRadius: 5,
                                elevation: 2,
                            }}
                        >
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => logout()}
                            >
                                <FontAwesome size={16} name="plane" color={colors.BLUE} />
                                <Text style={styles.menuText}>{t("settings_screen_logout_btn")}</Text>
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
        padding: 32,
    },
    diagonalBackground: {
        position: "absolute",
        top: -100,
        left: 0,
        right: 0,
        height: 360,
        zIndex: -1,
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
