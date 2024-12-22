import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useContext } from "react";
import { fetchData } from "../api/service";
import { IHotel } from "../types";
import ListItem from "../components/ListItem";
import { FavoritesContext } from "../contexts/FavoriteContext";
import colors from "../theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Favorites() {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();
    const { favorites } = useContext(FavoritesContext);

    const [data, setData] = useState<IHotel[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredData, setFilteredData] = useState<IHotel[]>();
    const [refreshing, setRefreshing] = useState(true);

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
    }, [refreshing]);

    useEffect(() => {
        setFilteredData(data?.filter((item) => favorites?.includes(item.id)));
        setRefreshing(false);
    }, [data, refreshing, favorites]);

    const renderItem = ({ item, index }: { item: IHotel; index: number }) => (
        <ListItem item={item} index={index} />
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={colors.BLUE} />
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
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <Text style={styles.header}>{t("favorites_title")}</Text>
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                onRefresh={() => {
                    setRefreshing(true);
                }}
                refreshing={refreshing}
                ListEmptyComponent={
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text>{t("favorites_no_favorites_label")}</Text>
                    </View>
                }
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
        marginVertical: 24,
        width: 200,
        color: "#333",
        fontFamily: "Poppins_700Bold",
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
