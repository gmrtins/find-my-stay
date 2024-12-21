import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import RangeSlider, { Slider } from 'react-native-range-slider-expo';
import { useTranslation } from "react-i18next";
import colors from "@/app/theme/colors";


export interface IFilters {
    stars: number[];
    rating: string[];
    min_price?: number;
    max_price?: number;
    distance?: number;
}

interface IFiltersProps {
    onApplyFilters: (f: IFilters) => void;
    maxPrice?: number;
}

export default function Filters(props: IFiltersProps) {
    const { onApplyFilters, maxPrice } = props;
    const { t } = useTranslation();

    const stars = Array.from({ length: 5 }, (_, i) => i + 1);
    const ratings = [t("rating_message_poor"), t("rating_message_good"), t("rating_message_very_good"), t("rating_message_excellent")];

    const [filters, setFilters] = useState<IFilters>({
        stars: [],
        rating: [],
        min_price: 0,
        max_price: maxPrice,
        distance: undefined
    });

    return (
        <View style={styles.filtersContainer}>
            <Text style={styles.title}>Filter</Text>

            {/* STARS */}
            <Text style={styles.filterTitle}>Stars</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
                {stars.map((_, index) => <TouchableOpacity key={index.toString()} style={filters.stars.includes(index + 1) ? [styles.ratingBtn, { backgroundColor: '#f2f2f2' }] : styles.ratingBtn} onPress={() => {
                    if (filters.stars.includes(index + 1)) {
                        setFilters({ ...filters, stars: filters.stars.filter((item) => item !== index + 1) })
                    } else {
                        setFilters({ ...filters, stars: [...filters.stars, index + 1] })
                    }
                }}>
                    <Text>{index + 1}</Text>
                    <FontAwesome size={16} name={filters.stars.includes(index + 1) ? "star" : "star-o"} color={colors.YELLOW} />
                </TouchableOpacity >)}
            </View>
            <View style={styles.divider}></View>

            {/* RATING */}
            <Text style={styles.filterTitle}>Rating</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
                {ratings.map((r, index) => <TouchableOpacity key={index.toString()} style={filters.rating.includes(r) ? [styles.ratingBtn, { backgroundColor: '#f2f2f2' }] : styles.ratingBtn} onPress={() => {
                    if (filters.rating.includes(r)) {
                        setFilters({ ...filters, rating: filters.rating.filter((item) => item !== r) })
                    } else {
                        setFilters({ ...filters, rating: [...filters.rating, r] })
                    }
                }}>
                    <Text>{r}</Text>
                </TouchableOpacity >)}
            </View>
            <View style={styles.divider}></View>

            {/* PRICE RANGE */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                <Text style={styles.filterTitle}>Price</Text>
                <Text style={styles.filterTitle}>{`${filters.min_price} € - ${filters.max_price} €`}</Text>
            </View>
            <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', marginBottom: 32 }}>
                <RangeSlider min={0} max={maxPrice ?? 0}
                    fromValueOnChange={value => setFilters({ ...filters, min_price: value })}
                    toValueOnChange={value => setFilters({ ...filters, max_price: value })}
                    initialFromValue={0}
                    containerStyle={{ height: 20, flex: 1, justifyContent: 'center' }}
                    knobSize={18}
                    barHeight={3}
                    styleSize={22}
                    inRangeBarColor={colors.BLUE}
                    fromKnobColor="blue"
                    toKnobColor="blue"
                />

            </View>

            <TouchableOpacity style={styles.applyButton} onPress={() => { onApplyFilters(filters) }}>
                <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity >
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16
    },
    filterTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8
    },
    filterDescription: {
        fontSize: 14,
        fontWeight: 'light'
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#f2f2f2',
        marginVertical: 16
    },
    ratingBtn: {
        flex: 1,
        flexDirection: "row",
        padding: 8,
        borderRadius: 8,
        borderColor: '#f2f2f2',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
    },
    filtersContainer: {
        paddingHorizontal: 16,
    },
    applyButton: {
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: colors.BLUE,
        borderRadius: 8,
        alignItems: 'center'
    },
    applyButtonText: {
        color: 'white',
        fontSize: 14
    }
});
