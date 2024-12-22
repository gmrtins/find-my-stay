import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import colors from '../theme/colors';

export default function SplashScreen({ navigation }) {
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
            console.log('user', user);
            navigation.replace(user ? 'Main' : 'Login');
        });
        return unsubscribe;
    }, []);

    return (
        <View style={styles.centeredView}>
            <ActivityIndicator size="large" color={colors.BLUE} />
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
