import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { fetchData } from '../api/service';
import { IHotel } from '../types';
import ListItem from '../components/ListItem';
import { login } from '../configs/firebaseConfig';
import BottomSheet, { BottomSheetFlatList, BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Filters, { IFilters } from '../components/Filters';
import { getRatingMessage } from '../utils';

export default function Homepage() {
    const sheetRef = useRef<BottomSheet>(null);

    const [data, setData] = useState<IHotel[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState<IHotel[]>();
    const { t } = useTranslation();

    useEffect(() => {
        const getData = async () => {
            try {
                const hotels = await fetchData();
                setData(hotels);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getData();
        login();
    }, []);

    useEffect(() => {
        setFilteredData(data?.filter((item) => item.name.includes(search)));
    }, [search]);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);


    const getMaxPrice = useMemo(() => {
        return data?.reduce((max, p) => p.price > max ? p.price : max, data[0].price);
    }, [data]);




    const applyFilters = (f: IFilters) => {
        let newData = data.filter(hotel => {
            const matchesStars = f.stars.length === 0 || f.stars.includes(hotel.stars);
            const matchesPrice = (!f.min_price || hotel.price >= f.min_price) && (!f.max_price || hotel.price <= f.max_price);
            const matchesRating = f.rating.length === 0 || f.rating.includes(getRatingMessage(hotel.userRating));

            return matchesStars && matchesPrice;
            //&& matchesRating;
        });

        setFilteredData(newData.filter((item) => item !== null));


        // setFilteredData(data?.filter((item) => item.name.includes(search)));
    };


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
        <GestureHandlerRootView style={styles.container}>
            <Text style={styles.header}>{t('homepage_title')}</Text>
            <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={text => setSearch(text)} />
            <Button onPress={() => sheetRef.current?.expand()} title='Filter' />
            <FlatList
                data={filteredData || data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />

            <BottomSheet
                ref={sheetRef}
                onChange={handleSheetChanges}
                enablePanDownToClose
            >
                <BottomSheetView style={styles.bottomSheetContainer}>
                    <Filters onApplyFilters={(f) => { applyFilters(f); sheetRef.current?.close() }} maxPrice={getMaxPrice} />
                </BottomSheetView>
            </BottomSheet>
        </GestureHandlerRootView>
    );
};

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
    bottomSheetContainer: {
        backgroundColor: "white",
        paddingBottom: 16,
    },

});
