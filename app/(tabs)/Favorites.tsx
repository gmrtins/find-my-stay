import { View, Text, StyleSheet } from 'react-native';

export default function Favorites() {
    return (
        <View style={styles.container}>
            <Text>Tab Favorites</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
