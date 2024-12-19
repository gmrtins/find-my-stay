import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { fetchData } from '../api/service';
import { IHotel } from '../types';
import ListItem from '../components/ListItem';
import { getFavorites } from '../configs/firebaseConfig';

export default function Favorites() {
    const [data, setData] = useState<IHotel[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredData, setFilteredData] = useState<IHotel[]>();
    const [refreshing, setRefreshing] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const getDataFromAPI = async () => {
            try {
                const hotels = await fetchData();
                setData(hotels);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getDataFromAPI();
    }, []);

    useEffect(() => {
        const fetchFavorites = async () => {
            const userFavorites: number[] = await getFavorites();
            console.log(JSON.stringify(userFavorites))
            setFilteredData(
                data?.filter((item) => userFavorites?.includes(item.id))
            );
            setRefreshing(false);
        };
        if (data) {
            fetchFavorites();
        }
    }, [data, refreshing]);

    const renderItem = ({ item }: { item: IHotel }) => (
        <ListItem item={item} />
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>Error: {error}</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{t('favorites_title')}</Text>
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                onRefresh={() => { setRefreshing(true) }}
                refreshing={refreshing}
                ListEmptyComponent={<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' }}><Text>{t('favorites_no_favorites_label')}</Text></View>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: "#fafafa",
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        marginVertical: 24,
        width: 200,
        color: "#333",
    },
    item: {
        padding: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 5,
        marginBottom: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    body: {
        fontSize: 14,
        color: "#555",
    },
    separator: {
        height: 1,
        backgroundColor: "#ddd",
        marginVertical: 5,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    error: {
        color: "red",
        fontSize: 16,
    },
});
