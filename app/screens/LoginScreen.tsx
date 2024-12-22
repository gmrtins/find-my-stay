import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView } from "react-native";
import { login } from "../configs/firebaseConfig";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "../theme/colors";
import { Button } from "../components/Button";

export default function LoginScreen() {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();

    const [email, setEmail] = useState("gmrtins@aol.co.uk");
    const [password, setPassword] = useState("password");

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.diagonalBackground}>
                <LinearGradient
                    colors={["#0974d3", colors.BLUE]}
                    style={[styles.gradient, { paddingTop: insets.top + 16 }]}
                />
            </View>

            <View style={styles.content}>
                <Text style={styles.heading}>{t("login_screen_title")}</Text>
                <View style={{ gap: 16 }}>
                    <View style={styles.inputsContainer}>
                        <TextInput
                            style={styles.inputItem}
                            placeholder={t("login_screen_email_placeholder")}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholderTextColor="#333333"
                        />
                        <View style={styles.divider}></View>
                        <TextInput
                            style={styles.inputItem}
                            placeholder={t("login_screen_password_placeholder")}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholderTextColor="#333333"
                        />
                    </View>
                    <Button
                        type="primary"
                        onPress={() => login(email, password)}
                        text={t("login_screen_login_btn")}
                    />
                    <Button
                        type="secondary"
                        onPress={() => router.push("/screens/RegisterScreen")}
                        text={t("login_screen_register_btn")}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontFamily: "Poppins_700Bold",
    },

    inputsContainer: {
        backgroundColor: "white",
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    inputItem: {
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
});
