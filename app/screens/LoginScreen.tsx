import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { login } from '../configs/firebaseConfig';
import { useTranslation } from 'react-i18next';

export default function LoginScreen() {
    const [email, setEmail] = useState("gmrtins@aol.co.uk");
    const [password, setPassword] = useState('password');

    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t("login_screen_title")}</Text>
            <TextInput
                style={styles.input}
                placeholder={t("login_screen_email_placeholder")}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder={t("login_screen_password_placeholder")}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title={t("login_screen_login_btn")} onPress={() => login(email, password)} />
            <Button title={t("login_screen_register_btn")} onPress={() => router.push('/screens/RegisterScreen')} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});
