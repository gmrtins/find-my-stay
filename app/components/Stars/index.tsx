import React from "react";
import { StyleSheet, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import colors from "@/app/theme/colors";

interface IStarsProps {
    rating: number;
}

export default function Stars(props: IStarsProps) {
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<FontAwesome key={i} size={16} name="star" color={colors.YELLOW} />);
        }
        return stars;
    }

    return (
        <View style={styles.rowContainer}>
            {renderStars(props.rating)}
        </View>
    );
}

const styles = StyleSheet.create({
    rowContainer: { flexDirection: "row", gap: 5 },
});
