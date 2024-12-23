import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, TextInput, StyleSheet, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "../theme/colors";
import Button from "../components/Button";
import Input from "../components/Input";
import Entypo from "@expo/vector-icons/Entypo";
import { register } from "../configs/firebaseConfig";

const RegisterScreen = () => {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        register(name, email, password);
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
                <Text style={styles.heading}>{t("register_screen_title")}</Text>
                <View style={{ gap: 16 }}>
                    <View style={styles.inputsContainer}>
                        <View style={styles.inputItem}>
                            <Input

                                placeholder={t("register_screen_name_placeholder")}
                                value={name}
                                onChange={setName}
                                leftIcon={<Entypo name="user" size={16} color={colors.BLUE} />}
                            />
                        </View>
                        <View style={styles.divider}></View>
                        <View style={styles.inputItem}>
                            <Input
                                placeholder={t("register_screen_email_placeholder")}
                                value={email}
                                onChange={setEmail}
                                leftIcon={<Entypo name="mail" size={16} color={colors.BLUE} />}
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.divider}></View>
                        <View style={styles.inputItem}>
                            <Input
                                placeholder={t("register_screen_password_placeholder")}
                                value={password}
                                onChange={setPassword}
                                secureTextEntry
                                autoCapitalize="none"
                                leftIcon={<Entypo name="lock" size={16} color={colors.BLUE} />}
                            />
                        </View>
                    </View>
                    <Button
                        type="primary"
                        onPress={handleRegister}
                        text={t("register_screen_register_btn")}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

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

export default RegisterScreen;
