import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
    const animation = useRef<LottieView>(null);
    const navigation = useNavigation();
    useEffect(() => {
        const timeout = setTimeout(() => {

            const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
                navigation.navigate(user ? 'Main' : 'Login');
            });
            return unsubscribe;
        }, 2000);
        return () => clearTimeout(timeout);

    }, []);


    return (
        <View style={styles.centeredView}>
            <LottieView
                autoPlay
                ref={animation}
                style={styles.lottie}
                source={require('./../assets/animations/splash.json')}
                speed={3.5}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#C7E5F0",
    },
    lottie: {
        top: 100,
        width: Dimensions.get('window').width * 2,
        height: Dimensions.get('window').height * 2,
    },
});
