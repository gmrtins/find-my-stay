import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { changeLanguage } from '../i18n';
import { useTranslation } from 'react-i18next';

export default function Homepage() {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <Text>Tab Homepage</Text>
            <Button onPress={() => changeLanguage('pt-PT')} title='PT'></Button>
            <Button onPress={() => changeLanguage('en-GB')} title='EN'></Button>
            <Button onPress={() => changeLanguage('es-ES')} title='ES'></Button>
            <FlatList>
                <Text>{t('hello')}</Text>
                <Text>{t('world')}</Text>
            </FlatList>
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
