import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { useTranslation } from "react-i18next";
import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
} from "react";
import { fetchData } from "../api/service";
import { IHotel } from "../types";
import ListItem from "../components/ListItem";
import { login } from "../configs/firebaseConfig";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Filters, { IFilters } from "../components/Filters";
import { getRatingMessage } from "../utils";
import colors from "../theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import { SearchBar } from "../components/SearchBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Homepage() {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();

    const sheetRef = useRef<BottomSheet>(null);

    const [data, setData] = useState<IHotel[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState<IHotel[]>();
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

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
        setIsFiltersVisible(index > -1 ? true : false);
    }, []);

    const getMaxPrice = useMemo(() => {
        return data?.reduce(
            (max, p) => (p.price > max ? p.price : max),
            data[0].price
        );
    }, [data]);

    const applyFilters = (f: IFilters) => {
        let newData = data?.filter((hotel) => {
            const matchesStars =
                f.stars.length === 0 || f.stars.includes(hotel.stars);
            const matchesPrice =
                (!f.min_price || hotel.price >= f.min_price) &&
                (!f.max_price || hotel.price <= f.max_price);
            const matchesRating =
                f.rating.length === 0 ||
                f.rating.includes(getRatingMessage(hotel.userRating));

            return matchesStars && matchesPrice;
            //&& matchesRating;
        });

        if (newData) setFilteredData(newData.filter((item) => item !== null));

        // setFilteredData(data?.filter((item) => item.name.includes(search)));
    };

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
        <GestureHandlerRootView style={styles.container}>
            <LinearGradient
                colors={["#0974d3", colors.BLUE]} // Customize your colors
                style={{
                    backgroundColor: colors.BLUE,
                    borderBottomLeftRadius: 16,
                    borderBottomRightRadius: 16,
                    padding: 16,
                    paddingTop: insets.top + 16,
                }}
            >
                <View style={{ marginVertical: 24 }}>
                    <Text style={styles.header}>{t("homepage_title")}</Text>
                    <Text style={styles.subheader}>{t("homepage_subtitle")}</Text>
                </View>

                {/* SEARCH */}
                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    isFiltersVisible={isFiltersVisible}
                    sheetRef={sheetRef}
                />
            </LinearGradient>

            {/* HOTELS LIST */}
            <View style={{ paddingHorizontal: 6, flex: 1 }}>
                <FlatList
                    data={filteredData || data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            </View>

            {/* FILTERS */}
            <BottomSheet
                index={-1}
                ref={sheetRef}
                onChange={handleSheetChanges}
                enablePanDownToClose
                enableDynamicSizing
            >
                <BottomSheetView style={styles.bottomSheetContainer}>
                    <Filters
                        onApplyFilters={(f) => {
                            applyFilters(f);
                            sheetRef.current?.close();
                        }}
                        maxPrice={getMaxPrice}
                    />
                </BottomSheetView>
            </BottomSheet>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    // HEADER
    container: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: "#fafafa",
        fontFamily: "Poppins_400Regular",
    },
    header: {
        fontSize: 28,
        color: "white",
        fontFamily: "Poppins_700Bold",
    },
    subheader: {
        fontSize: 28,
        color: "white",
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

    // BOTTOM SHEET
    bottomSheet: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    bottomSheetContainer: {
        backgroundColor: "white",
        paddingBottom: 16,
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8,
        marginBottom: 8,
    },
});
