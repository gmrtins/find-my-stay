import React from "react";
import { StyleSheet, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface IStarsProps {
    rating: number;
}

export default function Stars(props: IStarsProps) {
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<FontAwesome key={i} size={16} name="star" color={"#FFC400"} />);
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
