import { IHotel } from "@/app/types";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTranslation } from "react-i18next";
import { getCurrencySymbol } from "@/app/utils";
import colors from "@/app/theme/colors";
import { useNavigation } from "@react-navigation/native";

interface IListItemProps {
    item: IHotel;
}

export default function ListItem(props: IListItemProps) {
    const { item } = props;
    const [img, setImg] = useState(item.gallery[0]);

    const { t } = useTranslation();
    const navigation = useNavigation();

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<FontAwesome key={i} size={16} name="star" color={colors.YELLOW} />);
        }
        return stars;
    }
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Details', { data: item })}>
            <View style={{ flexDirection: "row", gap: 10 }}>
                <Image source={{ uri: img }} onError={() => setImg("https://blocks.astratic.com/img/general-img-portrait.png")}
                    style={styles.image} />
                <View style={styles.details}>
                    <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
                    <View style={[styles.rowContainer, { marginBottom: 5 }]}>
                        {renderStars(item.stars)}
                    </View>
                    <View style={[styles.rowContainer, { alignItems: 'flex-end' }]}>
                        <Text style={[styles.body, { fontSize: 18, fontWeight: 'bold', color: colors.BLUE }]}>{item.price + ' ' + getCurrencySymbol(item.currency)}</Text>
                        <Text style={[styles.body, { fontSize: 10, fontWeight: 'light', marginBottom: 2 }]}>{t('per_night_tag')}</Text>
                    </View >

                </View >
            </View >
            <View style={{ flexDirection: "row", gap: 16, paddingVertical: 4, borderRadius: 4, paddingHorizontal: 8 }}>
                <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                    <FontAwesome size={10} name="map-o" color={colors.BLUE} />
                    <Text style={{ fontSize: 10 }}>{item.location.city}</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                    <FontAwesome size={10} name="thumbs-o-up" color={colors.BLUE} />
                    <Text style={{ fontSize: 10 }}>{item.userRating}</Text>
                </View>

            </View>
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "white",
        borderRadius: 5,
        marginBottom: 5,
        flexDirection: "column",
        gap: 8
    },
    details: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
        wordWrap: "break-word",
        width: "100%"
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
    rowContainer: {
        flexDirection: "row",
        gap: 5
    },
    image: {
        width: 75,
        height: 75,
        borderRadius: 12
    }
});
